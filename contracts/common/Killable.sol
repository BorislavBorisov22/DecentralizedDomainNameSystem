pragma solidity ^0.4.17;

import "./Owned.sol";

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