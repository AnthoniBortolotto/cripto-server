const NodeRSA = require("node-rsa");

export async function getKeys() {
  const key = new NodeRSA();
  const keys = await key.generateKeyPair();
  return [keys.exportKey('private'), keys.exportKey('public'), keys];
}



