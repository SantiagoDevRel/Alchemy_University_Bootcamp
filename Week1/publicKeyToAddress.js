const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex } = require("ethereum-cryptography/utils");


//Ethereum address is the last 20 bytes of the hash Keccak256 of the public key(removing the first byte of the public key)
function getAddress(publicKey) {
    let publicKeySliced = publicKey.slice(1,(publicKey.length)) //remove first byte of the public key
    let addressHash = keccak256(Uint8Array.from(publicKeySliced)) //! parse the object to be hashed to Uint8Array
    return toHex(addressHash.slice(addressHash.length - 20, addressHash.length)); //return Uint8Array and change toHex

}

console.log(getAddress([
    4,  56,  92,  58, 110, 192, 185, 213, 122,  67,  48,
  219, 214,  40,  73, 137, 190,  91, 208,  14,  65, 197,
   53, 249, 202,  57, 182, 174, 124,  82,  27, 129, 205,
   36,  67, 254, 242, 158, 127,  52, 170, 140, 128,   2,
  236, 234, 255,  66,  44, 209, 246,  34, 187,  72,  48,
  113,  65,  16, 231,  54,   4,  77, 143,   8,  79
]))

module.exports = getAddress;