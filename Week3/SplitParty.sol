// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Party {
    uint public amount;

    mapping(address => uint256) balances;
    address[] public participants;

    constructor(uint _amount) {
        amount = _amount;
    }

    //To be part of the party every member needs to pay the amount(public variable)
    function rsvp() external payable {
        require(msg.value == amount && balances[msg.sender] == 0);
        balances[msg.sender] = msg.value;
        participants.push(msg.sender);
    }

    //send the _amount to _add and split the left over among all the participants
    function payBill(address _add, uint _amount) external {
        (bool success, ) = _add.call{value: _amount}("");
        require(success);
        uint remainingFundsPerUser = address(this).balance /
            participants.length;
        for (uint i = 0; i < participants.length; i++) {
            (bool success2, ) = participants[i].call{
                value: remainingFundsPerUser
            }("");
            require(success2);
        }
    }
}
