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
    function register(bytes domain, bytes4 ip) public payable;
    
    function edit(bytes domain, bytes4 newIp) public;
    
    function transferDomain(bytes domain, address newOwner) public;
    
    function getIP(bytes domain) public view returns (bytes4);
    
    function getPrice(bytes domain) public view returns (uint);
    
    function getReceipts(address account) public view returns (Receipt[]);
}





contract DomainNameSystem is Killable, DomainNameSystemBase {
    using SafeMath for uint256;
   
    struct DomainInfo {
        bytes4 ip;
        uint expires;
    }
   
    // for domains with length more than one hour and
    uint[] lengthPriceIncreases = [
        100000000000000000,
        50000000000000000,
        40000000000000000,
        30000000000000000,
        20000000000000000,
        10000000000000000
    ];
   
    mapping(bytes => DomainInfo) domainNameToDomainInfo;
    mapping(bytes => address) domainNameToOwner;
   
    mapping(address => Receipt[]) addressToReceipts;
   
    // constants
    uint public constant DOMAIN_REGISTRATION_EXPIRY_PERIOD = 1 years;
    uint public DOMAIN_REGISTRATION_PRICE = 1 ether;
    uint public DOMAIN_START_PRICE = 1 ether;
   
    uint MIN_DOMAIN_NAME_LENGTH = 5;
   
    event LogDomainRegistered(address owner, bytes domain, bytes4 ip, uint expiresIn);
    event LogDomainExtended(address owner, bytes domain, bytes4 ip, uint expiresIn);
    event LogIpEdited(address owner, bytes domain, bytes4 oldIp, bytes4 newIp);
    event LogDomainTransferred(bytes domain, address oldOwner, address newOwner);
   
    modifier canRegisterDomain(bytes domainName) {
        require(isDomainOwner(msg.sender, domainName) || domainAvailableForRegistration(domainName));
        _;
    }
   
    modifier validDomainName(bytes domainName) {
        require(domainName[MIN_DOMAIN_NAME_LENGTH - 1] != bytes1(0x0));
        _;
    }
 
    function isDomainOwner(address adr, bytes domainName) public view returns(bool) {
        return domainNameToOwner[domainName] == adr && !domainAvailableForRegistration(domainName);
    }
   
    function domainAvailableForRegistration(bytes domainName) public view returns(bool) {
        return domainNameToDomainInfo[domainName].expires < now;
    }
 
    function register(bytes domain, bytes4 ip) public payable canRegisterDomain(domain) validDomainName(domain) {
        require(msg.value >= DOMAIN_REGISTRATION_PRICE);
       
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
       
        Receipt memory newReceipt = Receipt({
            amountPaidWei: DOMAIN_REGISTRATION_PRICE,
            timestamp: now,
            expires: domainNameToDomainInfo[domain].expires
        });
       
        addressToReceipts[msg.sender].push(newReceipt);
    }
   
    function edit(bytes domain, bytes4 newIp) public {
        require(isDomainOwner(msg.sender, domain));
       
        bytes4 oldIp = domainNameToDomainInfo[domain].ip;
        domainNameToDomainInfo[domain].ip = newIp;
       
        LogIpEdited(msg.sender, domain, oldIp, newIp);
    }
   
    function transferDomain(bytes domain, address newOwner) public {
        require(isDomainOwner(msg.sender, domain));
       
        address oldOwner = domainNameToOwner[domain];
        domainNameToOwner[domain] = newOwner;
       
        LogDomainTransferred(domain, oldOwner, newOwner);
    }
   
    function getIP(bytes domain) public view returns (bytes4) {
        return domainNameToDomainInfo[domain].ip;
    }
   
    function getPrice(bytes domain) public view returns (uint) {
        domain = domain;
        return DOMAIN_REGISTRATION_PRICE;
    }
   
    function getReceipts(address account) public view returns (Receipt[]) {
        return addressToReceipts[account];
    }
   
    function getDomainInfo(bytes domain) public view returns (address owner, uint expires, bytes4 ip) {
        owner = domainNameToOwner[domain];
        expires = domainNameToDomainInfo[domain].expires;
        ip = domainNameToDomainInfo[domain].ip;
    }
   
    function getNewPrice(bytes domainName) public pure returns(uint) {
       
    }
}
