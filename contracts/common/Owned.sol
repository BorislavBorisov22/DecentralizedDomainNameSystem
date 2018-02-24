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