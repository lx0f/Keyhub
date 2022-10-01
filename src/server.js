const { httpServer, httpsServer } = require('./config');

require('dotenv').config();

const httpPort = process.env.HTTP_PORT || 3000;
const httpsPort = process.env.HTTPS_PORT || 3001;

if (process.env.HTTP) httpServer.listen(httpPort);
// TODO: can't connect to https server
if (process.env.HTTPS) httpsServer.listen(httpsPort);
