const config = {
  // old -> 0x259d80fca05d945614f49da3d56f98ed664d8192
    contractAddress: '0x517b66adafe85a73cb109a37aed089753eb5bb1b',
    contractAbi:[
        {
          "constant": true,
          "inputs": [],
          "name": "DOMAIN_REGISTRATION_EXPIRY_PERIOD",
          "outputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [],
          "name": "kill",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "receiver",
              "type": "address"
            }
          ],
          "name": "withDrawAndKill",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "DOMAIN_REGISTRATION_PRICE",
          "outputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "MIN_DOMAIN_NAME_LENGTH",
          "outputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "MIN_DOMAIN_PRICE",
          "outputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "newOwner",
              "type": "address"
            }
          ],
          "name": "transferOwnership",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "owner",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "domain",
              "type": "bytes32"
            },
            {
              "indexed": false,
              "name": "ip",
              "type": "bytes4"
            },
            {
              "indexed": false,
              "name": "expiresIn",
              "type": "uint256"
            }
          ],
          "name": "LogDomainRegistered",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "owner",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "domain",
              "type": "bytes32"
            },
            {
              "indexed": false,
              "name": "ip",
              "type": "bytes4"
            },
            {
              "indexed": false,
              "name": "expiresIn",
              "type": "uint256"
            }
          ],
          "name": "LogDomainExtended",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "owner",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "domain",
              "type": "bytes32"
            },
            {
              "indexed": false,
              "name": "oldIp",
              "type": "bytes4"
            },
            {
              "indexed": false,
              "name": "newIp",
              "type": "bytes4"
            }
          ],
          "name": "LogIpEdited",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "domain",
              "type": "bytes32"
            },
            {
              "indexed": false,
              "name": "oldOwner",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "newOwner",
              "type": "address"
            }
          ],
          "name": "LogDomainTransferred",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "oldOwner",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "newOwner",
              "type": "address"
            }
          ],
          "name": "OwnershipChanged",
          "type": "event"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "adr",
              "type": "address"
            },
            {
              "name": "domainName",
              "type": "bytes32"
            }
          ],
          "name": "isDomainOwner",
          "outputs": [
            {
              "name": "",
              "type": "bool"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "domainName",
              "type": "bytes32"
            }
          ],
          "name": "domainAvailableForRegistration",
          "outputs": [
            {
              "name": "",
              "type": "bool"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "domain",
              "type": "bytes32"
            },
            {
              "name": "ip",
              "type": "bytes4"
            }
          ],
          "name": "register",
          "outputs": [],
          "payable": true,
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "domain",
              "type": "bytes32"
            },
            {
              "name": "newIp",
              "type": "bytes4"
            }
          ],
          "name": "edit",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "domain",
              "type": "bytes32"
            },
            {
              "name": "newOwner",
              "type": "address"
            }
          ],
          "name": "transferDomain",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "domain",
              "type": "bytes32"
            }
          ],
          "name": "getIP",
          "outputs": [
            {
              "name": "",
              "type": "bytes4"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "domain",
              "type": "bytes32"
            }
          ],
          "name": "getPrice",
          "outputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "account",
              "type": "address"
            }
          ],
          "name": "getReceipts",
          "outputs": [
            {
              "components": [
                {
                  "name": "amountPaidWei",
                  "type": "uint256"
                },
                {
                  "name": "timestamp",
                  "type": "uint256"
                },
                {
                  "name": "expires",
                  "type": "uint256"
                }
              ],
              "name": "",
              "type": "tuple[]"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "domain",
              "type": "bytes32"
            }
          ],
          "name": "getDomainInfo",
          "outputs": [
            {
              "name": "owner",
              "type": "address"
            },
            {
              "name": "expires",
              "type": "uint256"
            },
            {
              "name": "ip",
              "type": "bytes4"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        }
      ]
};

export default config;