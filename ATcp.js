class ATcp {
    constructor(clientSocket, serverSocket) {
        this.clientSocket = clientSocket;
        this.serverSocket = serverSocket;
        //clientBuffer = 0;
        //serverBuffer = 0;
        this.Nodebuffer = require('buffer');
        this.NodeUdp = require('dgram');

        this.NodeUdpClient;
        this.NodeUdpServer;
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
        // --- Starting server ---
        console.log("Creating server...");
        this.NodeUdpServer = this.NodeUdp.createSocket('udp4');
        this.NodeUdpServer.bind(this.serverSocket);
        let serverOn = true;
        setTimeout(() => console.log("Server on! Using port: " + this.serverSocket), 3000);
        // ------------------------------


        // emits on new datagram msg
        this.NodeUdpServer.on('message', function (msg, info) {
            console.log("Data received from client : " + msg.toString());

        });


    }
    connectToClient() {
        // 3 way handshake
    }
    sendFile(fileName) {
        //let packetsArray = [];
    }


    //------ For CLIENT ----------

    createTcpClient() {

        // --- Starting client server ---
        console.log("Creating tcp client...");
        this.NodeUdpClient = this.NodeUdp.createSocket('udp4');
        this.NodeUdpClient.bind(this.clientSocket);
        let clientOn = true;
        setTimeout(() => console.log("client created! Using port " + this.clientSocket), 3000);
        // ------------------------------
    }

    connectToServer() {
        //3 way handshake (NOT FINISHED)
        return true;
    }

    requestFile(fileName) {
        //connecting to server.. (will use 3 way handshake)
        let isConnected = this.connectToServer();

        //Enviando nome do arquivo a buscar


    }

}


module.exports = ATcp;

/*
NodeUdpServer.on('listening', function () {
    let address = NodeUdpServer.address();
    let port = address.port;
    console.log('Server is listening at port ' + port);

});
*/