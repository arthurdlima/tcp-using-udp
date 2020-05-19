class ATcp {
    constructor(clientSocket, serverSocket) {
        this.clientSocket = clientSocket;
        this.serverSocket = serverSocket;
        //clientBuffer = 0;
        //serverBuffer = 0;
        this.Nodebuffer = require('buffer');
        this.NodeUdp = require('dgram');
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
        console.log("Creating server...");

        const NodeUdpServer = this.NodeUdp.createSocket('udp4');
        NodeUdpServer.bind(this.serverSocket);
        let serverOn = true;
        setTimeout(() => console.log("Server on! Using port: " + this.serverSocket), 3000);


        // emits on new datagram msg
        NodeUdpServer.on('message', function (msg, info) {
            console.log('Data received from client : ' + msg.toString());

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

        console.log("Creating tcp client...");
        const NodeUdpClient = this.NodeUdp.createSocket('udp4');
        NodeUdpClient.bind(this.clientSocket);
        let clientOn = true;
        setTimeout(() => console.log("client created! Using port " + this.clientSocket), 3000);


    }

    connectToServer() {
        //3 way handshake

    }

    requestFile(fileName) {
        //depois que tiver connectado..
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