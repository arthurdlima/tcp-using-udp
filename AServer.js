const ATcp = require('./ATcp');

class AServer {
    constructor(serverSocket) {
        this.serverSocket = serverSocket;
    }

    serverOn() {
        const aserver = new ATcp();
        aserver.createTcpServer();
    }

}
module.exports = AServer;