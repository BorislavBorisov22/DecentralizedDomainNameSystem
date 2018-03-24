
import contractConfig from './ddns-config';

const { web3 } = window;
let ddnsContract;

function getContract () {
    if (ddnsContract) {
        return ddnsContract;
    }

    const Contract = web3.eth.contract(contractConfig.contractAbi);
    const contractInstance = Contract.at(contractConfig.contractAddress);

    ddnsContract =  {
        domainPrice(domainName) {
            return new Promise((resolve, reject) => {
                contractInstance.getPrice(domainName, {from: web3.eth.accounts[0]}, (err, res) => {
                    if (err) {
                        reject(err);
                    }

                    const priceInEther = web3.fromWei(res.toString(), 'ether');

                    resolve(priceInEther);
                });
            });
        },
        domainInfo(domainName) {
            return new Promise((resolve, reject) => {
                contractInstance.getDomainInfo(domainName, {from: web3.eth.accounts[0]}, (err, res) => {
                    if (err) {
                        reject(err);
                    }

                    const domainInfo = {
                        owner: res[0],
                        expires: res[1].toString(),
                        ip: web3.toUtf8(res[2])
                    };
                    resolve(domainInfo);
                });
            });
        },
        buyDomain(domain) {
            return new Promise((resolve, reject) => {
                contractInstance.register(domain.domainName, web3.fromUtf8(domain.ip), {from: web3.eth.accounts[0], value: web3.toWei(domain.price, 'ether')}, (err, res) => {
                    if (err) {
                        reject(err);
                    }

                    resolve(res);
                });
            });
        },
        getDomain(domainName) {
            return Promise.all([this.domainPrice(domainName), this.domainInfo(domainName)])
                .then(([price, info]) => {                    
                    return Object.assign({}, {price, domainName}, info);
                });
        },
        editDomain({name, ip}) {
            return new Promise((resolve, reject) => {
                contractInstance.edit(name, web3.fromUtf8(ip), {from: web3.eth.accounts[0]}, (err, res) => {
                    if (err) {
                        reject(err);
                    }

                    resolve(res);
                });
            });
        },
        transferDomain(domainName, transferTo) {
            return new Promise((resolve, reject) => {
                contractInstance.transferDomain(domainName, transferTo, {from: web3.eth.accounts[0]}, (err, res) => {
                    if (err) {
                        reject(err);
                    }

                    resolve(res);
                });
            });
        }
    };

    return ddnsContract;
}

export default getContract;