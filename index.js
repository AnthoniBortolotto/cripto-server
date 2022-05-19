const express = require('express');
const app = express();
const port = 8080;
const { getKeys } = require('./utils/index')
const keys = getKeys();

//Rotas
const index = require("./routes/index");
const keysRoute = require("./routes/keys");

app.use("/", index);
app.use("/keys", keysRoute)


app.listen(port, ()=> {
    console.log(`servidô rodando listening on port ${port}`);
})


module.exports = {app, keys};
