// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./StorageSlot.sol";

//EOA --> Proxy --> Logic1
//EOA --> Proxy --> Logic2

contract Proxy {
    uint public x = 0;

    function changeImplementation(address _implementation) external {
        //store the address of the new implementation contract in the getAddressSlot "impl"
        StorageSlot.getAddressSlot(keccak256("impl")).value = _implementation;
    }

    //if I call Proxy with a function that is not in proxy
    //will send this msg.data to the implementation contract
    fallback() external {
        (bool success, ) = StorageSlot
            .getAddressSlot(keccak256("impl"))
            .value
            .delegatecall(msg.data);
        require(success);
    }
}

contract Logic1 {
    uint public x = 0;

    function changeX(uint _x) external {
        x = _x;
    }
}

contract Logic2 {
    uint public x = 10;

    function changeX(uint _x) external {
        x = _x * 2;
    }

    function tripleX() external {
        x *= 3;
    }
}
