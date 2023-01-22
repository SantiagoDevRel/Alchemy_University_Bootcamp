const Block = require('./Block');

class Blockchain {
    constructor() {
        const GenesisBlock = new Block("Genesis Block") //Creating genesis block
        this.chain = []; //creating the chain (array)
        this.chain.push(GenesisBlock) //push the genesis block into the chain
    }

    isValid(){ //check if the chain is valid
        for(let i=this.chain.length-1;i>0;i--){
            //previousHash of current block != hash of previous block --> return false (INVALID)
            if(this.chain[i].previousHash.toString() != this.chain[i-1].toHash().toString()){
                return false;
            }
        }
        return true
    }


    addBlock(block){//block only contains data so far
        //here we add a property "previousHash" that contains the hash of the previous block
        
        block.previousHash = this.chain[this.chain.length-1].toHash() 
        //example: if we will add block1 to the chain, we will hash the genesisBlock 
        //we will add the hash of the genesis block to the current block1
        //this way we link block1 with genesisBlock and so on...

        this.chain.push(block); //add a new block to the chain
    }

}