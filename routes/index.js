const NodeRSA = require("node-rsa");
const express = require("express");
const router = express.Router();
const { getClientPublicKey, setPublicKey } = require("../utils/clientKey");
const keys = require("../utils/ownKeys");



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
