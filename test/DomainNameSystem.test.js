/* globals web3 contract */

const DomainNameSystem = artifacts.require('../contracts/DomainNameSystem.sol')


contract('DomainNameSystem', ([owner, accountHelper, secondAccountHelper]) => {
    let sut;

    before(() => {
        web3.eth.defaultAccount = owner;
    });

    beforeEach(async () => {
        sut = await DomainNameSystem.new();
    });

    it('expect to return true when called with domain name that has not been registerd', async() => {
        const domainName = 'somedomain.com';
        const available  = await sut.domainAvailableForRegistration(domainName);

        assert(available, 'Domain should be available for registration');
    });

    it('expect to return false when domain is currently registered and has not already expired', async() => {
        const domainName = 'somedomainName';
        const domainIp = '1033';
        const price = web3.toWei(1.1, 'ether');

        await sut.register(domainName, domainIp, { from: owner, value: price});

        const available  = await sut.domainAvailableForRegistration(domainName);

        assert(!available, 'Domain should not be available for registration');
    });
});