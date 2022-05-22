const NodeRSA = require("node-rsa");
const express = require("express");
const app = express();
const port = 8080;
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json();
const cors = require('cors');
const { getKeys } = require("./utils/index");

const { setPublicKey, getClientPublicKey } = require("./utils/clientKey");


getKeys().then(ownKeys => {
  app.use(jsonParser) //precisa disso pra entender bodies

  app.use(cors({
      origin: '*'
  }));
  app.post("/keys", async (req, res) => {
    try {
      const publicKey = req.body.publicKey;
      setPublicKey(publicKey);
      console.log( await ownKeys[1]);
      await res.send({ serverPublicKey: ownKeys[1] }); //manda a própria chave pública
    } catch (e) {
      console.log("erro:", e);
      res.status(500).send("deu ruim");
    }
  });
  
  app.post("/", async (req, res) => {
    const key = await new NodeRSA();
    if (getClientPublicKey() === null) {
      console.log("deu ruim ta null");
    } else {
      await key.importKey(getClientPublicKey(), "public");
      const msgEncrypt = await key.encrypt("Chave enviada rapa");
      const msgReceived = req.body.msg;
      const decrypter = await new NodeRSA().importKey(ownKeys[0], "private");
      const decryptMSG = await decrypter.decrypt(msgReceived);
      console.log("mensagem criptografada", msgReceived);
      console.log("mensagem descriptografada", decryptMSG.toString());
      // const msgEncrypt = keys[2].encrypt('Chave enviada rapa')
      res.send(msgEncrypt);
    }
  });
  
  app.listen(port, () => {
    console.log(`servidô rodando listening on port ${port}`);
  });
});


module.exports = { app };
