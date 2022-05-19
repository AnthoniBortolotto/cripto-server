const  express = require('express');
const router = express.Router();
const ownKeys = require('../index')
const {setPublicKey} = require('../utils/clientKey')



router.post('/keys', (req, res) =>{
    const publicKey = req.body.publicKey
    setPublicKey(publicKey);
    res.send(ownKeys[1])
})

module.exports = router;