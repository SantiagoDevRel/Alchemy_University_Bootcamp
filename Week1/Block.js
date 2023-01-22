const SHA256 = require('crypto-js/sha256');

class Block {
    //everytime a block is created, it contains data
    constructor(data){
        this.data = data;
        this.previousHash;
    }

    //it must hash the data of the current block + the previous block hash
    //SHA256(Data[currentBlock]+PreviousBlockHash)
    toHash() {
        return SHA256(this.data+this.previousHash)
    }
}

module.exports = Block;
