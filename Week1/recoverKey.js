const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const hashMessage = require('./Keccak256Hash');
const signMessage = require("./signMessage");

async function recoverKey(message, signed) {
    const [signature, recoveryBit] = await signed;
    
    return secp.recoverPublicKey(hashMessage(message), signature, recoveryBit)
    
    //Test --> Should return same public Key
    //console.log (toHex(await secp.recoverPublicKey(hashMessage(message), signature, recoveryBit)))
    //console.log(toHex(secp.getPublicKey("6b911fd37cdf5c81d4c0adb1ab7fa822ed253ab0ad9aa18d77257c88b29b718e")))
   
   
}



recoverKey("hello world", signMessage("hello world"))


module.exports = recoverKey;