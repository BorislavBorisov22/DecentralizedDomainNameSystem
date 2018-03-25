pragma solidity ^0.4.17;

contract Owned {
    address owner;

    function Owned() public {
        owner = msg.sender;
    }

    event OwnershipChanged(address oldOwner, address newOwner);

    modifier OwnerOnly {
        require(msg.sender == owner);
        _;
    }

    function transferOwnership(address newOwner) public OwnerOnly {
        address oldOwner = owner;
        owner = newOwner;
        OwnershipChanged(oldOwner, owner);
    }
}



contract Killable is Owned {

    function kill() public OwnerOnly {
        selfdestruct(owner);
    }

    function withDrawAndKill(address receiver) public OwnerOnly {
        require(receiver != address(0x0));
        receiver.transfer(this.balance);
        kill();
    }
}

library SafeMath {
	function mul(uint256 _a, uint256 _b) internal pure returns (uint256) {
		if (_a == 0) {
			return 0;
		}
		uint256 c = _a * _b;
		assert(c / _a == _b);
		return c;
	}

	function div(uint256 _a, uint256 _b) internal pure returns (uint256) {
		uint256 c = _a / _b;
		return c;
	}

	function sub(uint256 _a, uint256 _b) internal pure returns (uint256) {
		assert(_b <= _a);
		return _a - _b;
	}

	function add(uint256 _a, uint256 _b) internal pure returns (uint256) {
		uint256 c = _a + _b;
		assert(c >= _a);
		return c;
	}
}

contract DomainNameSystemBase {
    struct Receipt{
        uint amountPaidWei;
        uint timestamp;
        uint expires;
    }
    
    //the domain is bytes, because string is UTF-8 encoded and we cannot get its length
    //the IP is bytes4 because it is more efficient in storing the sequence
    function register(bytes32 domain, bytes4 ip) public payable;
    
    function edit(bytes32 domain, bytes4 newIp) public;

    function transferDomain(bytes32 domain, address newOwner) public;
    
    function getIP(bytes32 domain) public view returns (bytes4);
    
    function getPrice(bytes32 domain) public view returns (uint);
    
    function getReceipts(address account) public view returns (Receipt[]);
}

contract DomainNameSystem is Killable, DomainNameSystemBase {
    using SafeMath for uint256;
   
    struct DomainInfo {
        bytes4 ip;
        uint expires;
    }

    uint[] priceChanges = [
        5000000000000000,
        10000000000000000,
        20000000000000000,
        50000000000000000,
        100000000000000000
    ];

    uint DECREASE_PRICE_START_INDEX = 15;
    uint INCREASE_PRICE_START_INDEX = 10;

    bytes1 BYTES_DEFAULT_VALUE = bytes1(0x0);

    uint public constant MIN_DOMAIN_PRICE = 1 ether;
    uint public constant DOMAIN_REGISTRATION_EXPIRY_PERIOD = 1 years;
    uint public constant MIN_DOMAIN_NAME_LENGTH = 5;

    uint public DOMAIN_REGISTRATION_PRICE = 1 ether;

    mapping(bytes32 => DomainInfo) domainNameToDomainInfo;
    mapping(bytes32 => address) domainNameToOwner;

    mapping(address => Receipt[]) addressToReceipts;

    event LogDomainRegistered(address owner, bytes32 domain, bytes4 ip, uint expiresIn);
    event LogDomainExtended(address owner, bytes32 domain, bytes4 ip, uint expiresIn);
    event LogIpEdited(address owner, bytes32 domain, bytes4 oldIp, bytes4 newIp);
    event LogDomainTransferred(bytes32 domain, address oldOwner, address newOwner);
   
    modifier canRegisterDomain(bytes32 domainName) {
        require(isDomainOwner(msg.sender, domainName) || domainAvailableForRegistration(domainName));
        _;
    }
   
    modifier validDomainName(bytes32 domainName) {
        require(domainName[MIN_DOMAIN_NAME_LENGTH - 1] != BYTES_DEFAULT_VALUE);
        _;
    }
 
    function isDomainOwner(address adr, bytes32 domainName) public view returns(bool) {
        return domainNameToOwner[domainName] == adr && !domainAvailableForRegistration(domainName);
    }
   
    function domainAvailableForRegistration(bytes32 domainName) public view returns(bool) {
        return domainNameToDomainInfo[domainName].expires < now;
    }
 
    function register(bytes32 domain, bytes4 ip) public payable canRegisterDomain(domain) validDomainName(domain) {
        uint newDomainPrice = getNewDomainPrice(domain);
        require(msg.value >= newDomainPrice);
       
        domainNameToDomainInfo[domain].ip = ip;
        if (isDomainOwner(msg.sender, domain)) {
            uint newExpiryPeriod = domainAvailableForRegistration(domain) ?
                now.add(DOMAIN_REGISTRATION_EXPIRY_PERIOD) :
                domainNameToDomainInfo[domain].expires.add(DOMAIN_REGISTRATION_EXPIRY_PERIOD);
               
            domainNameToDomainInfo[domain].expires = newExpiryPeriod;
            LogDomainRegistered(msg.sender, domain, ip, newExpiryPeriod);
        } else {
            domainNameToDomainInfo[domain].expires = now.add(DOMAIN_REGISTRATION_EXPIRY_PERIOD);
            domainNameToOwner[domain] = msg.sender;
           
            LogDomainExtended(msg.sender, domain, ip, domainNameToDomainInfo[domain].expires);
        }

        DOMAIN_REGISTRATION_PRICE = newDomainPrice;

        Receipt memory newReceipt = Receipt({
            amountPaidWei: DOMAIN_REGISTRATION_PRICE,
            timestamp: now,
            expires: domainNameToDomainInfo[domain].expires
        });
       
        addressToReceipts[msg.sender].push(newReceipt);
    }
   
    function edit(bytes32 domain, bytes4 newIp) public {
        require(isDomainOwner(msg.sender, domain));
       
        bytes4 oldIp = domainNameToDomainInfo[domain].ip;
        domainNameToDomainInfo[domain].ip = newIp;
       
        LogIpEdited(msg.sender, domain, oldIp, newIp);
    }
   
    function transferDomain(bytes32 domain, address newOwner) public {
        require(isDomainOwner(msg.sender, domain));
       
        address oldOwner = domainNameToOwner[domain];
        domainNameToOwner[domain] = newOwner;
       
        LogDomainTransferred(domain, oldOwner, newOwner);
    }
   
    function getIP(bytes32 domain) public view returns (bytes4) {
        return domainNameToDomainInfo[domain].ip;
    }
   
    function getPrice(bytes32 domain) public view returns (uint) {
        return getNewDomainPrice(domain);
    }
   
    function getReceipts(address account) public view returns (Receipt[]) {
        return addressToReceipts[account];
    }
   
    function getDomainInfo(bytes32 domain) public view returns (address owner, uint expires, bytes4 ip) {
        owner = domainNameToOwner[domain];
        expires = domainNameToDomainInfo[domain].expires;
        ip = domainNameToDomainInfo[domain].ip;
    }
   
    function getNewDomainPrice(bytes32 domainName) validDomainName(domainName) internal view returns(uint) {
        uint increasePriceAmount = 0;
        uint decreasePriceAmount = 0;

        uint pricesIndex = 0;
        uint domainNameIndex = DECREASE_PRICE_START_INDEX;
        // 5 is priceChanges length => hardcoded for less gas expenses
        while (
            domainName[domainNameIndex] != BYTES_DEFAULT_VALUE &&
            pricesIndex < 5 &&
            DOMAIN_REGISTRATION_PRICE - priceChanges[pricesIndex] >= 0) {

            decreasePriceAmount = priceChanges[uint(pricesIndex)];
            pricesIndex++;
            domainNameIndex++;
        }
        
        if (decreasePriceAmount > 0) {
            return DOMAIN_REGISTRATION_PRICE - decreasePriceAmount;
        }

        pricesIndex = 0;
        domainNameIndex = INCREASE_PRICE_START_INDEX;
        while (
            domainName[domainNameIndex] == BYTES_DEFAULT_VALUE
            && pricesIndex < 5) {

            increasePriceAmount = priceChanges[uint(pricesIndex)];
            pricesIndex++;
            domainNameIndex--;
        }

        return DOMAIN_REGISTRATION_PRICE + increasePriceAmount;
    }

    function contractAddress() public view returns(address) {
        return address(this);
    }
}
