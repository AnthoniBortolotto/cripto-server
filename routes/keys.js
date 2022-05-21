const express = require("express");
const router = express.Router();
const ownKeys = require("../utils/ownKeys");
const { setPublicKey, getClientPublicKey } = require("../utils/clientKey");

router.post("/keys", (req, res) => {
    try {
        const publicKey = req.body.publicKey;
        console.log(getClientPublicKey());
        setPublicKey(publicKey);
        //res.send(ownKeys[1])
        res.send(getClientPublicKey());
    }
  catch (e) {
      console.log("erro:", e);
      res.status(500).send("deu ruim");
  }
});

module.exports = router;
