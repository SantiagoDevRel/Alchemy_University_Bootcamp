class Tree {
    constructor() {
        this.root = null;
    }

    addNode(node){
        //If there is not root, add the first node to the root
        if(this.root === null){
            this.root = node;
        }else{
            this.recursiveFunction(this.root,node)
        }
    }

    recursiveFunction(parent,child){
        if(child.data < parent.data){
            if(parent.left != null){
            //if parent already has a left child
            //call the function again with the left child as a parent
                this.recursiveFunction(parent.left,child)
            }
            else{
                parent.left = child;
           }
        }
        if(child.data > parent.data){
            if(parent.right != null){
                //if parent already has a right child
                //call the function again with the left child as a parent
                this.recursiveFunction(parent.right, child)
            }
            else{
                parent.right = child;
            }
        
        }

    }

    hasNode(number){
        return this.searchRecursive(this.root, number)
    }

    //iterates through the nodes from the root to the leaves
    searchRecursive(parent, number){
        
        if(parent === null ){
            return false
        }
        //if current parent is equal to number, return true
        if(parent.data === number){
            return true;
        }
        //if number is greater than current data, search again from the right child
        if(number > parent.data){
            return this.searchRecursive(parent.right,number)
        }
        //if number is less than current data, search again from the left child
        if(number<parent.data){
            return this.searchRecursive(parent.left,number)
        }
    }

}

module.exports = Tree;