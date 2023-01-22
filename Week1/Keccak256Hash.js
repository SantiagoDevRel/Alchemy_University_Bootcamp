const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");

function hashMessage(message) {
    //1. Convert string to bytes 
    //2. hash the bytes
    //3. keccak256 returns Uint8Array
    //4. Convert uint8Array to Hexadecimal numbers
    
    return toHex(keccak256(utf8ToBytes(message))); 
    //Return 7fec49b05b091a6706efca76cb74938c42e90f23a98c37b8b0232ac1fc623a1f
    
    //return keccak256(utf8ToBytes(message)); 
    /* 
    Return Uint8Array(32) [
        127, 236,  73, 176,  91,   9,  26, 103,
          6, 239, 202, 118, 203, 116, 147, 140,
         66, 233,  15,  35, 169, 140,  55, 184,
        176,  35,  42, 193, 252,  98,  58,  31
      ] 
    */
}

module.exports = hashMessage

