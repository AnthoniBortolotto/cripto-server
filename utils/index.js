const NodeRSA = require("node-rsa");

async function getKeys() {
  const key = new NodeRSA({ b: 1024 });
  return [key.exportKey('private'), key.exportKey('public'), key];
}

module.exports = { getKeys: getKeys };

