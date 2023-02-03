class TrieNode {
    constructor(key, children = {}, isWord=false) {
        this.key = key;
        this.children = children;
        this.isWord = isWord;
        
    }
}
