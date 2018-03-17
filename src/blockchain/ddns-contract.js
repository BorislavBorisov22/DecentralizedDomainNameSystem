
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
        getDomainPrice(domainName) {
            return new Promise((resolve, reject) => {
                contractInstance.getPrice(domainName, {from: web3.eth.accounts[0]}, (err, res) => {
                    if (err) {
                        reject(err);
                    }

                    const priceInEther = web3.fromWei(res.toString(), 'ether');
                    resolve(priceInEther);
                });
            });
        }
    };

    return ddnsContract;
}

export default getContract;