const ATcp = require('./ATcp');

class AClient {
    constructor(clientSocket) {
        this.clientSocket = clientSocket;
    }

    clientWantsFile(serverSocket,fileName) {

    }

}

module.exports = AClient;