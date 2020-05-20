
const AClient = require('./AClient');
const AServer = require('./AServer');


//Creating a client and server object
const aclient = new AClient(2222);
const aserver = new AServer(3333);

//Turning on server
aserver.serverOn();
aclient.tcpClientOn();

//Client requesting connection to server
aclient.requestServerConnection(3333);


