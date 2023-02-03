// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Switch {
    address public recipient;
    address public owner;
    uint public period;

    constructor(address _recipient) payable {
        owner = msg.sender;
        recipient = _recipient;
        period = block.timestamp + 52 weeks;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    //send the funds to the recipient if the owner hasn't ping in 52 weeks
    function withdraw() external {
        require(block.timestamp >= period);
        (bool success, ) = payable(recipient).call{
            value: address(this).balance
        }("");
        require(success);
    }

    //restart the period 52 weeks starting from the current block
    function ping() external onlyOwner {
        period = block.timestamp + 52 weeks;
    }
}
