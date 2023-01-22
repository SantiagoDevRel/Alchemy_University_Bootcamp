const secp = require("ethereum-cryptography/secp256k1");
const hashMessage = require('./Keccak256Hash');

const PRIVATE_KEY = "6b911fd37cdf5c81d4c0adb1ab7fa822ed253ab0ad9aa18d77257c88b29b718e"; //Random PrivateKey

async function signMessage(msg) {
    //return Uint8Array with 2 arguments [Uint8Array(71/70bytes) message signed] AND the recovery bit
    //console.log(await secp.sign(hashMessage(msg),PRIVATE_KEY, {recovered: true}));

    return await secp.sign(hashMessage(msg),PRIVATE_KEY, {recovered: true});

    //Recovered true, returns the recovery bit to get the public key later.
}

module.exports = signMessage