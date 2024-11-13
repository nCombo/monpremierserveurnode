const http = require('http');
const appli = require('./appli');

appli.set("port", 3002);
const server = http.createServer(appli);

server.listen(3002);