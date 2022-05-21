const express = require("express");
const app = express();
const port = 8080;
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json();


//Rotas
const index = require("./routes/index");
const keysRoute = require("./routes/keys");

app.use(jsonParser) //precisa disso pra entender bodies
app.use("/", index);
app.use("/keys", keysRoute);

app.listen(port, () => {
  console.log(`servidô rodando listening on port ${port}`);
});

module.exports = { app };
