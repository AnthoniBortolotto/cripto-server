const express = require('express');
const app = express();
const port = 8080;



//Rotas
const index = require("./routes/index");


app.use("/", index);


app.listen(port, ()=> {
    console.log(`servidô rodando listening on port ${port}`);
})

module.exports = app;
