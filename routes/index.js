const NodeRSA = require("node-rsa");
const  express = require('express');
const router = express.Router();
const { getClientPublicKey } = require('../utils/clientKey')
const {keys} = require('../index')



router.post('/', (req, res) =>{
    const key = new NodeRSA();
    if(getClientPublicKey() === null){
        console.log('deu ruim ta null')
    }
    else {
        key.import(getClientPublicKey(), 'public');
        const msgEncrypt = key.encrypt('Chave enviada rapa');
        const msgReceived = req.body.msg;
        const decryptMSG = keys[2].decrypt(msgReceived).toString();
       // const msgEncrypt = keys[2].encrypt('Chave enviada rapa')
        res.send(msgEncrypt)
    }
    
})

module.exports = router;