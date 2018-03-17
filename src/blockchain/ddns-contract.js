
import contractConfig from './ddns-config';

let ddnsContract;

function getContract (web3) {
    if (ddnsContract) {
        return ddnsContract;
    }

    const Contract = web3.eth.contract(contractConfig.contractAbi);
    ddnsContract = Contract.at(contractConfig.contractAddress);

    return ddnsContract;
}

export default getContract;