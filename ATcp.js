class ArthurTcp {
    constructor(clientSocket, serverSocket) {
        this.clientSocket = clientSocket;
        this.serverSocket = serverSocket;
        //clientBuffer = 0;
        //serverBuffer = 0;
        packetsArray = [];

        udp = require('dgram');
        udpServer = udp.createSocket('udp4');
    }

    getClientSocket() {
        return this.clientSocket;
    }
    getServerSocket() {
        return this.serverSocket;
    }
    setClientSocket(newClientSocket) {
        this.clientSocket = newClientSocket;
    }
    setServerSocket(newServerSocket) {
        this.serverSocket = newServerSocket;
    }

    // -------------------------------
    createTcpServer() {

    }
    connect() {

    }

}