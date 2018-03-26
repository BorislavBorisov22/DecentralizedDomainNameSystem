/* globals artifacts, contract, web3 */
const assertRevert = require('./helpers/assertRevert');

const DomainNameSystemBankingMock = artifacts.require('./mocks/DomainNameSystemBankingMock.sol');

contract('DomainNameSystemBanking', ([owner, wallet, anotherAccount]) => {
    let sut;
    let events = [];

    before(() => {
        web3.eth.defaultAccount = owner;
    });

    beforeEach(async () => {
        sut = await DomainNameSystemBankingMock.new();
    });
    
    it('expect sendFundsToAddress to send raised funds to the specified receiver', async() => {
        const contractBalance = web3.toWei(2, 'ether');

        const initialWalletBalance = await web3.eth.getBalance(wallet);

        await web3.eth.sendTransaction({from: owner, value: contractBalance, to: sut.address});
        await sut.sendFundsToAddress(wallet, {from: owner});

        const fundsReceived = Number(await web3.eth.getBalance(wallet)) - Number(initialWalletBalance);

        assert.equal(fundsReceived, contractBalance);
        assert.equal(0, Number(await web3.eth.getBalance(sut.address)));
    });

    it('expect withdraw to send raised funds to the owner', async() => {
        const contractBalance = web3.toWei(2, 'ether');

        await sut.transferOwnership(anotherAccount, {from: owner});
        const ownerOldBalance = await web3.eth.getBalance(anotherAccount);

        await web3.eth.sendTransaction({from: wallet, value: contractBalance, to: sut.address});
        await sut.withdraw({from: anotherAccount});

        const ownerNewBalance = Number(await web3.eth.getBalance(anotherAccount));

        assert(ownerNewBalance > ownerOldBalance);
        assert.equal(0, Number(await web3.eth.getBalance(sut.address)));
    });

    it('expect transferFundsToAddress to revert transaction when not called from contract owner', async() => {
        const sendPromise = sut.sendFundsToAddress(anotherAccount, {from: wallet});

        await assertRevert(sendPromise);
    });

    it('expect widthdraw to revert transaction when caller is not the contract owner', async() => {
        const withdrawPromise = sut.withdraw({from: anotherAccount});

        await assertRevert(withdrawPromise);
    });
});