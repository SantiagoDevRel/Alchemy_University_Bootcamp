function verifyProof(proof, node, root, concat) {
    
    let myRoot = node

    for(let i=0;i<proof.length;i++){

        if(proof[i].left){
            myRoot = concat(proof[i].data,myRoot)
        }else{
            myRoot = concat(myRoot,proof[i].data)
        }

    }

    return root===myRoot


}
