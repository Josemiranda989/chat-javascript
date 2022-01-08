const http = require('http');
const path = require('path');

const express = require('express');
const socketio = require('socket.io'); //conexion en tiempo real

const app = express();
const server = http.createServer(app)
const io = require("socket.io")(server);

/* Settings */
app.set('port', process.env.PORT || 3000)

require('./sockets')(io)

/* Static files */
app.use(express.static(path.join(__dirname, 'public')))

/* Starting the server */
server.listen(3000, () => console.log('listening on port', app.get('port')))

