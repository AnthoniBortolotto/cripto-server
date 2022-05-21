const NodeRSA = require("node-rsa");

async function getKeys() {
  const key = new NodeRSA();
  const keys = await key.generateKeyPair();
  return [keys.exportKey('private'), keys.exportKey('public'), keys];
}

module.exports = { getKeys: getKeys };

