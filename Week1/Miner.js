const SHA256 = require('crypto-js/sha256');
const TARGET_DIFFICULTY = BigInt(0x0fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
const MAX_TRANSACTIONS = 10;

const mempool = [];
const blocks = [];

function addTransaction(transaction) {
    //Add a transaction to the mempool
    mempool.push(transaction); 
}

function mine() {
    let arr = [], i=0, hashResult, hashInt;

    //Create block object with id: length of the array --> block1{id: 0}, block2{id: 1}
    const block={
        id: blocks.length,
    }

    //if more than MAX_TRANSACTIONS stop to push more transactions to the transactionsArray
    //if mempool is empty, stop to push more transactions to the transactionsArray
    while(i<MAX_TRANSACTIONS && mempool.length!=0){
        arr.push(mempool.pop())
        i++
    }

    //Add the transactionsArray to the block object
    block.transactions = arr;

    //Add a block nonce to the block(starting with 0)
    block.nonce = 0 

    do{
        //hash the block object SHA256({id, transactions, nonce})
        hashResult = SHA256(JSON.stringify(block))
        //parse the hash to BigInt to be able to compare with the difficulty
        hashInt = BigInt(`0x${hashResult}`)
        //if the hash is greater than the difficulty, start again increasing the nonce by 1
        block.nonce++
    }while(hashInt > TARGET_DIFFICULTY)   

    //if the hash is less than the difficulty, add the hash to the block
    block.hash = hashResult
    
    //block{id, transactions, nonce, hash}
    blocks.push(block);
}
