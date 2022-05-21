const NodeRSA = require("node-rsa");
const express = require("express");
const router = express.Router();
const { getClientPublicKey, setPublicKey } = require("../utils/clientKey");
const keys = require("../utils/ownKeys");

router.post("/", async (req, res) => {
  const key = await new NodeRSA();
  if (getClientPublicKey() === null) {
    console.log("deu ruim ta null");
  } else {
    await key.import(getClientPublicKey(), "public");
    const msgEncrypt = await key.encrypt("Chave enviada rapa");
    const msgReceived = req.body.msg;
    const decryptMSG = await keys[2].decrypt(msgReceived).toString();
    // const msgEncrypt = keys[2].encrypt('Chave enviada rapa')
    res.send(msgEncrypt);
  }
});

/* router.put("/", async (req, res) => {
    const chave = req.body.publicKey;
    console.log(chave);
     setPublicKey(chave);
    const clientKey = getClientPublicKey();
    console.log(clientKey);
    res.send({ chave: clientKey});
   funciona
  const x = await keys;
  console.log("público", x[0]);
  console.log("privado", x[1]);
  res.send({ serverPublicKey: x[1] }); 
}); */

module.exports = router;
