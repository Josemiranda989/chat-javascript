const http = require('http');
const path = require('path');

require("dotenv").config();

const express = require('express');
const socketio = require('socket.io'); //conexion en tiempo real

const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app)
const io = require("socket.io")(server);

/* db conecctions */
mongoose
  .connect(process.env.MONGODB_URI)
  .then((db) => console.log("db is connected to", db.connection.name))
  .catch((error) => console.log(error));

/* Settings */
app.set('port', process.env.PORT || 3000)

require('./sockets')(io)

/* Static files */
app.use(express.static(path.join(__dirname, 'public')))

/* Starting the server */
server.listen(3000, () => console.log('listening on port', app.get('port')))

