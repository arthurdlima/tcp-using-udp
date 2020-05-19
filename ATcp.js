class ATcp {
    constructor(clientSocket, serverSocket) {
        this.clientSocket = clientSocket;
        this.serverSocket = serverSocket;
        //clientBuffer = 0;
        //serverBuffer = 0;
        let packetsArray = [];

        const buffer = require('buffer');
        const udp = require('dgram');
        const udpServer = udp.createSocket('udp4');
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

    // --------------------------------------


    //------ For SERVER ----------

    createTcpServer() {
        //While aqui infinito
        console.log("Server created");
    }
    connectToClient() {
        // 3 way handshake
    }
    sendFile(fileName) {

    }


    //------ For CLIENT ----------

    connectToServer() {
        //3 way handshake
    }

    getFile(fileName) {
        //depois que tiver connectado..
    }

}


module.exports = ATcp;