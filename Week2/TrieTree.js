const TrieNode = require('./TrieNode');

class Trie {
    constructor() {
        this.root = new TrieNode(null);
    }

    insert(word){
        let node=this.root, aux, isWord;

        for(let i=0;i<word.length;i++){
            //if there is no node-->
            if(!node.children[word[i]]){
                //create new node, instance the node as a children of the current root
                aux = new TrieNode(word[i])
                
                //write the children into the parent node
                node.children[word[i]] = aux
            }

            //change current node as a parent for the next iteration
            node = node.children[word[i]]

            if(i===word.length-1){
                node.isWord=true
            }
        }

        
    }   

    contains(word){
        let node = this.root;

        
        for(let i=0;i<word.length;i++){
            //if currentNode has a children that matches the key of the word-->
            if(node.children[word[i]]){
                node = node.children[word[i]]
            }
            //otherwise return false
            else{
                return false
            }
        }

        //last node.isWord should be true if contains the word, otherwise will return false
        return node.isWord    
    }

}
