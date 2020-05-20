const ATcp = require('./ATcp');

class AClient {
    constructor(clientSocket) {
        this.clientSocket = clientSocket;
        this.aclient = new ATcp(clientSocket, null)
    }

    tcpClientOn() {
        this.aclient.createTcpClient();
    }

    clientWantsFile(fileName) {
        this.aclient.requestFile(fileName);
    }

    requestServerConnection(serverSocket) {
        this.aclient.connectToServer(serverSocket);
    }
}

module.exports = AClient;