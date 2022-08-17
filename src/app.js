//Imports

const { app } = require('./setup');

//Use a preconfigured set port. If there isn't, use Port 3000
const port = process.env.PORT || 3000;

const server = app.listen(port, () => console.log(`Website at Port ${port}`));
const io = require('socket.io')(server);
app.set('socketio', io);
