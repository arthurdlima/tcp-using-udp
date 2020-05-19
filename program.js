
const AClient = require('./AClient');
const AServer = require('./AServer');

const aclient = new AClient(2222);
const aserver = new AServer(3333);

aserver.serverOn();
aclient.tcpClientOn();
