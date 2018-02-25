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
    //  struct Receipt{
    //     uint amountPaidWei;
    //     uint timestamp;
    //     uint expires;
    // }

    struct DomainInfo {
        bytes4 ip;
        uint expireTime;
    }

    uint constant minDomainName = 5;
    uint constant domainPrice = 1 ether;
    uint constant domainValidPeriod = 1 years;

    mapping(address => Receipt[]) receiptsByAddress;

    mapping(bytes => address) domainNameToOwner;
    mapping(bytes => DomainInfo) domainNameToDomainInfo;

    event DomainRegistered(bytes domainName, bytes4 domainIp, address domainOwner, uint domainExpires);
    event DomainTransferred(bytes domainName, address oldOwner, address newOwner);
    event DomainEdited(bytes domainName, bytes4 oldIp, bytes4 newIp);
    
    modifier ValidDomainLength(bytes domain) {
        require(domain[minDomainName - 1] != bytes1(0x0));
        _;
    }

    modifier DomainOwnerOnly(bytes domain) {
        require(domainNameToOwner[domain] == msg.sender);
        require(domainNameToDomainInfo[domain].expireTime > now);
        _;
    }

    function register(bytes domain, bytes4 ip) public payable ValidDomainLength(domain) {
        // check if the calling address is the domain owner or if the domain has expired and can be bought by another address
        require(domainNameToOwner[domain] == msg.sender || domainNameToDomainInfo[domain].expireTime < now);
        require(msg.value >= domainPrice);

        uint expireTime =
            domainNameToDomainInfo[domain].expireTime < now || domainNameToOwner[domain] != msg.sender ?
            now.add(domainValidPeriod) :
            domainNameToDomainInfo[domain].expireTime.add(domainValidPeriod);
        
        domainNameToDomainInfo[domain].expireTime = expireTime;
        domainNameToDomainInfo[domain].ip = ip;

        domainNameToOwner[domain] = msg.sender;

        receiptsByAddress[msg.sender].push(
            Receipt({
            amountPaidWei: msg.value,
            timestamp: now,
            expires: expireTime
        }));

        DomainRegistered(domain, ip, owner, expireTime);
    }
    
    function edit(bytes domain, bytes4 newIp) public DomainOwnerOnly(domain) {
        bytes4 oldIp = domainNameToDomainInfo[domain].ip;
        domainNameToDomainInfo[domain].ip = newIp;

        DomainEdited(domain, oldIp, newIp);
    }
    
    function transferDomain(bytes domain, address newOwner) public DomainOwnerOnly(domain) {
        require(newOwner != address(0x0));

        address oldOwner = domainNameToOwner[domain];
        domainNameToOwner[domain] = newOwner;

        DomainTransferred(domain, oldOwner, newOwner);
    }
    
    function getIP(bytes domain) public view returns (bytes4) {
        return domainNameToDomainInfo[domain].ip;
    }
    
    function getPrice(bytes domain) public view returns (uint) {
        domain = domain;
        return 1 ether;
    }
    
    function getReceipts(address account) public view returns (Receipt[]) {
        return receiptsByAddress[account];
    }

    function getDomainInfo(bytes domain) public view returns(uint expires, bytes4 ip, address domainOwner) {
        expires = domainNameToDomainInfo[domain].expireTime;
        ip = domainNameToDomainInfo[domain].ip;
        domainOwner = domainNameToOwner[domain];
    }
}