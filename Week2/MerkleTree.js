class MerkleTree {
    constructor(leaves, concat) {
        this.leaves = leaves;
        this.concat = concat;
    }

    getRoot(leaves = this.leaves) {
        //if the array has only 1 hash, that's the final root
        if(leaves.length === 1){
            return leaves[0]
        }

        //create an empty array with each new iteration in the function
        let auxArray = []

        //push into the auxArray the hash of every level in the tree
        for(let i=0;i<leaves.length;i+=2){
            let left = leaves[i]
            let right = leaves[i+1]
            if(!right){
                auxArray.push(left)
            }else{
                auxArray.push(this.concat(left,right))
            }
        }
        //if auxArray.length > 1, call the function getRoot() again.
        return this.getRoot(auxArray)
    }

    getProof(index, leaves = this.leaves, proof=[]){
        if(leaves.length===1) return proof
        const auxArr = []
        for(let i=0;i<leaves.length;i+=2){
            let left = leaves[i]
            let right = leaves[i+1]
            if(!right){
                auxArr.push(left)
            }else{
                auxArr.push(this.concat(left,right))
                if(i===index || i===index-1 ){
                    index%2===0 ? 
                    (proof.push({data: right,left: false}))
                    :
                    (proof.push({data: left,left: true}))
                }
               
            }
        }
        return this.getProof(Math.floor(index/2), auxArr, proof)

    }
}
