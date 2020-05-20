class ATcp {
    constructor(clientSocket, serverSocket) {

        //Used for creating client and server object
        this.clientSocket = clientSocket;
        this.serverSocket = serverSocket;
        //--------------------------------------

        //this.Nodebuffer = require('buffer');
        this.NodeUdp = require('dgram');
   
        this.NodeUdpServer;
        this.NodeUdpClient;    

        //The packet object that will hold the data
        this.ATcpPacket = require('./ATcpPacket')

        //Buffer for incoming or outgoing messages
        this.packetsBuffer = [];

        //connection status (After 3 way handshake, will be "true")
        this.connectionStatus = false;
        this.connectionPort = 0;

        //After connection, expected incial seq. number of the data.
        this.expectedSeqNumber = 0;
        const a = 2;

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
        console.log("Server on! Using port: " + this.serverSocket + "\n");
        // ------------------------------


        // emits when recieving packets
        this.NodeUdpServer.on('message', function (handShakeBuffer, info) {

            let clientPacket = JSON.parse(handShakeBuffer);

            console.log(clientPacket);

          

            /*
              if there is no data, syn is > 0 and server is NOT connected
              to a client, then it's a connection request
            */
            if (clientPacket.data == null && clientPacket.getSYN > 0 && this.connectionStatus == false) {
                this.clientConnectionRequest(clientPacket);
            }

        });


    }
    connectToClient() {
        // 3 way handshake started from server (example)

    }

    clientConnectionRequest(clientPacket) {

        // handle 3 way handshake request

        let clientPort = clientPacket.getSourcePort()
        let clientSequenceN = clientPacket.getSequenceNumber + 1
        let clientSYNC = clientPacket.getSYN()

        console.log(clientPort);
        console.log(clientSequenceN);
        console.log(clientSYNC);

        return;

        let handShake1 = false;
        let handShake2 = false;
        let handShake3 = false;

        // ---------- HANDSHAKE PART 1 ----------------

        let packet1 = new this.ATcpPacket();

        //setting packet header data
        packet1.setSourcePort(this.serverSocker);
        packet1.setDestinationPort(clientPort);
        packet1.setACK(clientSequenceN);
        packet1.setSYN(clientSYNC);

        this.NodeUdpServer.send(packet1, clientPort, 'localhost', function (error) {
            if (error) {
                console.log(error);
            } else {
                console.log("1-SYN-ACK sent back to client \n");
                handShake1 = true;
            }
        });
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
        console.log("client created! Using port " + this.clientSocket + "\n");

        // ------------------------------


    }

    connectToServer(serverSocket) {


        while (true) {

            //3 way handshake 

            let handShake1 = false;
            let handShake2 = false;
            let handShake3 = false;

            // ---------- HANDSHAKE PART 1 ----------------

            let packet1 = new this.ATcpPacket();

            //setting packet header data
            packet1.setSourcePort(this.clientSocket);
            packet1.setDestinationPort(serverSocket);
            packet1.setSequenceNumber(90001);
            packet1.setSYN(10000);

            //Converting packet to buffer
            let handShakeBuffer = Buffer.from(JSON.stringify(packet1));

            this.NodeUdpClient.send(handShakeBuffer, serverSocket, 'localhost', function (error) {
                if (error) {
                    console.log(error);
                } else {
                    console.log("1 CLIENT -> handshake packet sent to server! \n");
                    handShake1 = true;
                }
            });


            this.NodeUdpClient.on('message', function (msg, info) {
                if (msg.ACK == packet1.getSequenceNumber() + 1) {
                    console.log("2 CLIENT -> ack recieved from server! \n")
                    handShake2 = true;
                }
            });

            break;
        }

            // ---------- HANDSHAKE PART 2 ----------------




            
            //---------------------------------------------

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


