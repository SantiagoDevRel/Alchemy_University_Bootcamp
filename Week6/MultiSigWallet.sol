// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract MultiSig {
    address[] public owners;
    uint256 public required;
    uint public transactionCount;

    struct Transaction {
        address recipient;
        uint value;
        bool executed;
        bytes data;
    }

    mapping(uint => Transaction) public transactions;
    mapping(uint => mapping(address => bool)) public confirmations;

    constructor(address[] memory _owners, uint _required) {
        require(
            _owners.length != 0 && _required != 0 && _required < _owners.length
        );
        owners = _owners;
        required = _required;
    }

    modifier onlyOwners() {
        bool isOwner = false;
        for (uint i = 0; i < owners.length; i++) {
            if (msg.sender == owners[i]) {
                isOwner = true;
            }
        }
        require(isOwner);
        _;
    }

    function _addTransaction(
        address _recipient,
        uint _value,
        bytes memory data
    ) internal returns (uint) {
        //the ID of the transaction is index based (when transactionCount=1 && id=0)
        uint id = transactionCount;
        //save the transaction struct to the mapping (id is index 0 based)
        transactions[id] = Transaction(_recipient, _value, false, data);
        //increment transaction count
        transactionCount++;
        return id;
    }

    function confirmTransaction(uint _id) public onlyOwners {
        //confirm transaction from the msg.sender (should be a owner)
        confirmations[_id][msg.sender] = true;
        //if transaction confirmed, execute it.
        if (isConfirmed(_id)) executeTransaction(_id);
    }

    function getConfirmationsCount(
        uint transactionId
    ) public view returns (uint) {
        //returns the number of confirmations for the transactions passed as a parameter
        uint confirmationsTx = 0;
        for (uint i = 0; i < owners.length; i++) {
            if (confirmations[transactionId][owners[i]]) {
                confirmationsTx++;
            }
        }
        return confirmationsTx;
    }

    function submitTransaction(
        address destination,
        uint value,
        bytes memory data
    ) external onlyOwners {
        //add tx to the storage and confirm it only by the msg.owner
        uint id = _addTransaction(destination, value, data);
        confirmTransaction(id);
    }

    function isConfirmed(uint id) public view returns (bool) {
        //get confimations from the tx ID
        uint confirmationTx = getConfirmationsCount(id);
        if (confirmationTx >= required) return true;
        //return true if match the # of required signatures
        return false;
    }

    function executeTransaction(uint id) public {
        //check if tx is confirmed by the required signatures
        require(isConfirmed(id), "Transaction is not confirmed");
        //send the value to the recipient of the TX
        (bool success, ) = payable(transactions[id].recipient).call{
            value: transactions[id].value
        }(transactions[id].data);
        require(success);
        //change status of the tx to executed
        transactions[id].executed = true;
    }

    receive() external payable {}
}
