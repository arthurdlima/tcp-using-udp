class ATcp {
    constructor(clientSocket, serverSocket) {
        this.clientSocket = clientSocket;
        this.serverSocket = serverSocket;

        this.Nodebuffer = require('buffer');
        this.NodeUdp = require('dgram');
        this.NodeUdpClient;
        this.NodeUdpServer;

        //The packet object that will hold the data
        this.ATcpPacket = require('./ATcpPacket')

        //Buffer for incoming or outgoing messages
        this.packetsBuffer = [];

        //connection status (After 3 way handshake, will be "true")
        this.connectionStatus = false;

        //After connection, expected incial seq. number of the data.
        this.expectedSeqNumber = 000;

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
        setTimeout(() => console.log("Server on! Using port: " + this.serverSocket), 2000);
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
        setTimeout(() => console.log("client created! Using port " + this.clientSocket), 2000);
        // ------------------------------
    }

    connectToServer(serverSocket) {
        //3 way handshake 

        while (true) {

            // ------ PART 1 ----------------
            let packet1 = new this.ATcpPacket();

            //setting packet header data
            packet1.setDestinationPort(serverSocket);
            packet1.setSequenceNumber(0);
            packet1.setSYN(true);




            this.NodeUdpClient.send(fileName, 3333, 'localhost', function (error) {
                if (error) {
                    client.close();
                } else {
                    console.log('Data sent !!!');
                }
            });
            //-------------------------------------



            //If connection is true, break, else keep trying
            if (this.connectionStatus) {
                break;
            }
        }

    }

    requestFile(fileName) {

        //If 3 way handshake is true:
        if (this.connectionStatus) {
            console.log("It's working");
        }
    }

}


module.exports = ATcp;

/*
    this.NodeUdpClient.send(fileName, 3333, 'localhost', function (error) {
        if (error) {
            client.close();
        } else {
            console.log('Data sent !!!');
        }
    });
*/

/*
this.packetsBuffer.push(packet);
this.packetsBuffer.forEach((packet) => console.log(packet));
*/
