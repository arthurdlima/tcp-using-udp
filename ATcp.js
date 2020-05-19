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
        console.log("Creating server...");
        let serverOn = true;
        setTimeout(()=> console.log("Server on!"),3000);
        while (serverOn) {

            if (true) {
                
            }
        }
    }
    connectToClient() {
        // 3 way handshake
    }
    sendFile(fileName) {

    }


    //------ For CLIENT ----------

    createTcpClient() {
        const udpClient = udp.createSocket('udp4');

        console.log("Creating tcp client...");
        let clientOn = true;
        setTimeout(() => console.log("client created!"), 3000);
        while (clientOn) {

            if (true) {

            }
        }

    }

    connectToServer() {
        //3 way handshake

    }

    getFile(fileName) {
        //depois que tiver connectado..
    }

}


module.exports = ATcp;