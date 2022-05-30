const NodeRSA = require("node-rsa");
const express = require("express");
const app = express();
const port = 8080;
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const cors = require("cors");
const { getKeys } = require("./utils/index");

const { setPublicKey, getClientPublicKey } = require("./utils/clientKey");

getKeys().then((ownKeys) => { //gera as keys privada e pública
  app.use(jsonParser); //precisa disso pra entender bodies

  app.use(
    cors({
      origin: "*",
    }) //resolve cors
  );
  app.post("/keys", async (req, res) => { //rota para o cliente e o servidor terem as keys um do outro
    try {
      const publicKey = req.body.publicKey; // key que o cliente enviou
      setPublicKey(publicKey); // guarda a key que o cliente enviou
      console.log(await ownKeys[1]); // mostra a key pública do servidor
      await res.send({ serverPublicKey: ownKeys[1] }); //manda a própria chave pública
    } catch (e) { //se der erro
      console.log("erro:", e);
      res.status(500).send("deu ruim");
    }
  });

  app.post("/", async (req, res) => { //rota para o cliente e o servidor trocarem mensagens criptografadas
    const key = await new NodeRSA(); // construtor da classe da lib para criptografar
    if (getClientPublicKey() === null) { //se não tiver a key pública do cliente
      console.log("deu ruim ta null");
    } else {
      await key.importKey(getClientPublicKey(), "public"); //importa a key pública do cliente
      const msgEncrypt = await key.encrypt("Mensagem recebida", "base64"); //criptografa a mensagem com a key pública do cliente
      const msgReceived = req.body.msg; // recebe a mensagem criptografada
      const decrypter = await new NodeRSA().importKey(ownKeys[0], "private"); //importa a key privada do servidor para ser usada
      const decryptMSG = await decrypter.decrypt(msgReceived); //decriptografa a mensagem com a key privada do servidor
      console.log("mensagem criptografada", msgReceived); //mostra a mensagem criptografada
      console.log("mensagem descriptografada", decryptMSG.toString()); //mostra a mensagem descriptografada
      // const msgEncrypt = keys[2].encrypt('Chave enviada rapa')
      res.send({ msg: msgEncrypt }); //manda uma mensagem criptografada para o cliente
    }
  });

  app.listen(port, () => {
    console.log(`servidô rodando listening on port ${port}`);
  });
});

module.exports = { app };
