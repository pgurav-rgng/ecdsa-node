const secp = require("ethereum-cryptography/secp256k1");
const { randomBytes } = require("crypto");
const { toHex } = require("ethereum-cryptography/utils");

// Generate a random 32-byte private key
//const privateKey = randomBytes(32);
const privateKey = secp.secp256k1.utils.randomPrivateKey();

// Derive the public key from the private key
const publicKey = secp.secp256k1.getPublicKey(privateKey);

console.log("Private Key:", toHex(privateKey));
console.log("Public Key:", toHex(publicKey));
