/* globals web3 contract */

const DomainNameSystem = artifacts.require('../contracts/DomainNameSystem.sol')
const { duration, increaseTime, increaseTimeTo } = require('./helpers/increaseTime');
const assertRevert = require('./helpers/assertRevert');

contract('DomainNameSystem', ([owner, accountHelper, secondAccountHelper]) => {
    let sut;

    before(async () => {
        web3.eth.defaultAccount = owner;
    });

    beforeEach(async () => {
        sut = await DomainNameSystem.new();
    });

    it('expect domainAvailableForRegistration to return true when called with domain name that has not been registerd', async() => {
        const domainName = 'somedomain.com';
        const available  = await sut.domainAvailableForRegistration(domainName);

        assert(available, 'Domain should be available for registration');
    });

    it('expect domainAvailableForRegistration to return false when domain is currently registered and has not already expired', async() => {
        const domainName = 'somedomainName';
        const domainIp = '1033';
        const price = web3.toWei(1.1, 'ether');

        await sut.register(domainName, domainIp, { from: owner, value: price});

        const available  = await sut.domainAvailableForRegistration(domainName);

        assert(!available, 'Domain should not be available for registration');
    });

    it('expect isDomainOwner to return false when passing domain that is not owned by anyone', async() => {
        const domainName = 'somedomain';

        const isOwner = await sut.isDomainOwner(owner, domainName);
        assert(!isOwner, 'Should not be domain owner');
    });

    it('expect isDomainOwner to return true when passed owner is the owner of the domain and domain is currently not expired', async() => {
        const domainName = 'somedomain';
        const domainIp = 'someip';
        const price = web3.toWei(1.2, 'ether');

        await sut.register(domainName, domainIp, { from: owner, value: price});

        const isOwner = await sut.isDomainOwner(owner, domainName);
        assert(isOwner, 'Should be domain owner');
    });

    it('expect isDomainOwner to return true when passed owner was the owner of the domain but domain is currently expired', async() => {
        const domainName = 'somedomain';
        const domainIp = 'someip';
        const price = web3.toWei(1.2, 'ether');

        await sut.register(domainName, domainIp, { from: owner, value: price});

        await increaseTime(duration.years(1) + duration.minutes(20));

        const isOwner = await sut.isDomainOwner(owner, domainName);
        await increaseTime(-1 * (duration.years(1) + duration.minutes(20)))

        assert(!isOwner, 'Should be domain owner');
    });

    it('expect register to throw when trying to register domain name shorter than 5 symbols', async() => {
        const domainName = 'sss';
        const domainIp = 'someip';
        const price = web3.toWei(1.2, 'ether');

        const registerPromise = sut.register(domainName, domainIp, { from: owner, value: price});
        await assertRevert(registerPromise);
    });

    it('expect register to throw when trying to register a domain that is already owned by someone else', async() => {
        const domainName = 'domainName';
        const domainIp = 'someip';
        const price = web3.toWei(1.2, 'ether');

        await sut.register(domainName, domainIp, { from: accountHelper, value: price});
        const registerPromise = sut.register(domainName, domainIp, { from: owner, value: price});

        await assertRevert(registerPromise);
    });

    it('expect register to throw when trying to register a domain and not sending enough funds', async() => {
        const domainName = 'domainName';
        const domainIp = 'someip';
        const price = web3.toWei(0.5, 'ether');

        const registerPromise = sut.register(domainName, domainIp, { from: owner, value: price});

        await assertRevert(registerPromise);
    });

    it('expect to successfully register domain for a year and update domainInfo correctly', async() => {
        const domainName = 'dddname';
        const domainIp = 'some';
        const price = web3.toWei(1.2, 'ether');

        const initialTransaction = await sut.register(domainName, web3.fromUtf8(domainIp), { from: owner, value: price});

        const [domainOwner, expires, ip] = await sut.getDomainInfo(domainName);

        const expiryPeriod = await sut.DOMAIN_REGISTRATION_EXPIRY_PERIOD();

        const now = web3.eth.getBlock(initialTransaction.receipt.blockNumber).timestamp;
        const expectedExpiryPeriod = expiryPeriod.add(now);

        assert(domainOwner === owner);
        assert.deepEqual(expires, expectedExpiryPeriod);
        assert(web3.toUtf8(ip) === domainIp);
    });

    it('expect to extend a domain expiry period by a year when domain is registered by it\'s owner while still not expired', async() => {
        const domainName = 'dddname';
        const domainIp = 'some';
        const price = web3.toWei(1.2, 'ether');

        const initialTransaction = await sut.register(domainName, web3.fromUtf8(domainIp), { from: owner, value: price});
        await sut.register(domainName, web3.fromUtf8(domainIp), { from: owner, value: price});

        const [domainOwner, expires, ip] = await sut.getDomainInfo(domainName);

        const expiryPeriod = await sut.DOMAIN_REGISTRATION_EXPIRY_PERIOD();

        const now = web3.eth.getBlock(initialTransaction.receipt.blockNumber).timestamp;
        const expectedExpiryPeriod = expiryPeriod.add(expiryPeriod).add(now);

        assert.deepEqual(expires, expectedExpiryPeriod);
    });

    it('expect to update domainInfo and expiry period correctly when expired domain is registered from a new owner', async() => {
        const domainName = 'dddname';
        const domainIp = 'asdf';
        const price = web3.toWei(1.2, 'ether');

        await sut.register(domainName, web3.fromUtf8(domainIp), { from: owner, value: price});
        await increaseTime(duration.years(1) + duration.minutes(10));
        const initialTransaction = await sut.register(domainName, web3.fromUtf8(domainIp), { from: accountHelper, value: price});

        const [domainOwner, expires, ip] = await sut.getDomainInfo(domainName);

        const expiryPeriod = await sut.DOMAIN_REGISTRATION_EXPIRY_PERIOD();

        const now = web3.eth.getBlock(initialTransaction.receipt.blockNumber).timestamp;
        const expectedExpiryPeriod = expiryPeriod.add(now);

        assert.deepEqual(expires, expectedExpiryPeriod);
        assert.equal(domainOwner, accountHelper);
        assert.equal(web3.toUtf8(ip), domainIp);
    });

    it('expect edit domain to throw when editing domain that is not owned by called', async() => {
        const domainName = 'someDomain';
        const domainIp = 'somedomainIP';

        const editPromise = sut.edit(domainName, domainIp);
        await assertRevert(editPromise);
    });

    it('expect edit domain to edit domain ip correctly when domain edited by owner', async() => {
        const domainName = 'somedomain';
        const domainIp = 'someip';
        const price = web3.toWei(1.2, 'ether');

        const newIp = 'newi';

        await sut.register(domainName, web3.fromUtf8(domainIp), {from: owner, value: price});
        await sut.edit(domainName, web3.fromUtf8(newIp), {from: owner});

        const [,, ip] = await sut.getDomainInfo(domainName);

        assert.equal(web3.toUtf8(ip), newIp);
    });

    it('expect getIp to return empty string when called on non-registered domain name', async() => {
        const domainName = 'somedomain';

        const ip = web3.toUtf8(await sut.getIP(domainName));
        assert.equal(ip, '');
    });

    it('expect getIp to return correct ip when passed a registered domainName', async() => {
        const domainName = 'domainname';
        const domainIp = 'ipip';
        const price = web3.toWei(1.2, 'ether');

        await sut.register(domainName, web3.fromUtf8(domainIp), { from: owner, value: price });

        const ip = web3.toUtf8(await sut.getIP(domainName));
        assert.equal(ip, domainIp);
    });

    it('expect transferDomain to rever when trying to transfer domain not owned by sender', async() => {
        const transferPromise = sut.transferDomain('somedomain', accountHelper, {from: owner});
        await assertRevert(transferPromise);
    });

    it('expect to transferDomain to the passed newOwner when transfering domain owned by sender', async() => {
        const domainName = 'domainname';
        const domainIp = 'ipip';
        const price = web3.toWei(1.2, 'ether');

        await sut.register(domainName, web3.fromUtf8(domainIp), { from: owner, value: price });
        await sut.transferDomain(domainName, accountHelper);

        const [domainOwner] = await sut.getDomainInfo(domainName);
        assert.equal(domainOwner, accountHelper);
    });

    it('expect getPrice to return correct price increase for registering shorter domain names', async() => {
        const expectedDomainIncreases = {
            somed: web3.toWei(1.1, 'ether'),
            somedo: web3.toWei(1.1, 'ether'),
            somedom: web3.toWei(1.05, 'ether'),
            somedoma: web3.toWei(1.02, 'ether'),
            somedomai: web3.toWei(1.01, 'ether'),
            somedomain: web3.toWei(1.005, 'ether'),
            notsoshortdou: web3.toWei(1, 'ether')
        };

        const domainPricesPromises = Object.keys(expectedDomainIncreases).map(key => {
            return sut.getPrice(key);
        });

        const prices = await Promise.all(domainPricesPromises);
        Object.keys(expectedDomainIncreases).forEach((key, index) => {
            assert.equal(expectedDomainIncreases[key], prices[index]);
        });
    });

    it('expect getPrice to return correct price decrease for registering longer domain names', async() => {
        const expectedDomainIncreases = {
            somedomainnamenn: web3.toWei(0.995, 'ether'),
            somedomainnameean: web3.toWei(0.99, 'ether'),
            somedomainnameeaen: web3.toWei(0.98, 'ether'),
            somedomainnamenamen: web3.toWei(0.95, 'ether'),
            somedomainnamenamenn: web3.toWei(0.9, 'ether'),
            someveryverylongdomainName: web3.toWei(0.9, 'ether')
        };

        const domainPricesPromises = Object.keys(expectedDomainIncreases).map(key => {
            return sut.getPrice(key);
        });

        const prices = await Promise.all(domainPricesPromises);
        Object.keys(expectedDomainIncreases).forEach((key, index) => {
            assert.equal(expectedDomainIncreases[key], prices[index]);
        });
    });

    it('expect not to drop the price under the MIN_PRICE for domain no matter how many long domains are registered', async() => {
        const longDomainName = 'somelongDomainNameLongLong';
        const ip = 'some';

        await sut.register(longDomainName, ip, {from: owner, value: web3.toWei(1, 'ether')});
        await sut.register(longDomainName, ip, {from: owner, value: web3.toWei(1, 'ether')});
        await sut.register(longDomainName, ip, {from: owner, value: web3.toWei(1, 'ether')});
        await sut.register(longDomainName, ip, {from: owner, value: web3.toWei(1, 'ether')});

        const longDomainPrice = await sut.getPrice(longDomainName);

        const expectedMinPrice = web3.toWei(0.8, 'ether');

        assert.equal(longDomainPrice, expectedMinPrice);
    });

    it('expect domainInfo to return the correct owner, expires, and ip values', async() => {
        const domainName = 'dddname';
        const domainIp = 'some';
        const price = web3.toWei(1.2, 'ether');

        const initialTransaction = await sut.register(domainName, web3.fromUtf8(domainIp), { from: owner, value: price});

        const [domainOwner, expires, ip] = await sut.getDomainInfo(domainName);

        const expiryPeriod = await sut.DOMAIN_REGISTRATION_EXPIRY_PERIOD();

        const now = web3.eth.getBlock(initialTransaction.receipt.blockNumber).timestamp;
        const expectedExpiryPeriod = expiryPeriod.add(now);

        assert(domainOwner === owner);
        assert.deepEqual(expires, expectedExpiryPeriod);
        assert(web3.toUtf8(ip) === domainIp);
    });
});