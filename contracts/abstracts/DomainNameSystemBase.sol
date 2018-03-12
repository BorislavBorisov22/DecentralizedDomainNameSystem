pragma solidity ^0.4.17;

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