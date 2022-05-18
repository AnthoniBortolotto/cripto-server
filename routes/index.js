const  express = require('express');
const router = express.Router();

router.post('/', (req, res) =>{
    res.send('rota index rapa')
})

module.exports = router;