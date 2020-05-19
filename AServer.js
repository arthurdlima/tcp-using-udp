const ATcp = require('./ATcp');

class AServer {
    constructor(serverSocket) {
        this.serverSocket = serverSocket;
        this.aserver = new ATcp(null, serverSocket);
    }

    serverOn() {
        this.aserver.createTcpServer();
    }

}
module.exports = AServer;