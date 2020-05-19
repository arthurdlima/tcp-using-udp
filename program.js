
const AClient = require('./AClient');
const AServer = require('./AServer');


//Creating a client and server object
const aclient = new AClient(2222);
const aserver = new AServer(3333);

//Turning on server
aserver.serverOn();
aclient.tcpClientOn();

//Client receiving data from server (no handshake)
aclient.clientWantsFile('document-x');


