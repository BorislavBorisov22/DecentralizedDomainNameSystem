pragma solidity ^0.4.17;

import "./common/Killable.sol";

contract DomainNameSystemBanking is Killable{

    function sendFundsToAddress(address receiver) public OwnerOnly {
        receiver.transfer(address(this).balance);
    }

    function withdraw() public OwnerOnly {
        owner.transfer(address(this).balance);
    }
}