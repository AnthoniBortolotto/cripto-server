let clientPublicKey = null;

function getClientPublicKey(){
    return clientPublicKey;
}

function setPublicKey(publicKey){

     clientPublicKey = publicKey;

}

module.exports = {
    getClientPublicKey: getClientPublicKey,
    setPublicKey: setPublicKey,
}
