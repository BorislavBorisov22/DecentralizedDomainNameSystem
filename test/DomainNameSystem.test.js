/* globals web3 contract */

const DomainNameSystem = artifacts.require('../contracts/DomainNameSystem.sol')
const { duration, increaseTime } = require('./helpers/increaseTime');

contract('DomainNameSystem', ([owner, accountHelper, secondAccountHelper]) => {
    let sut;

    before(() => {
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
        assert(!isOwner, 'Should be domain owner');
    });
});