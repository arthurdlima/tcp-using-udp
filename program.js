
const AClient = require('./AClient');
const AServer = require('./AServer');

const aclient = new AClient();
const aserver = new AServer();

aserver.serverOn();
