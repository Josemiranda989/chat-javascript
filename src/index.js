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
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,

    useUnifiedTopology: true,
  })
  .then((db) => console.log("Db connectect to", db.connection.name))
  .catch((err) => console.log(err));

/* Settings */
app.set('port', process.env.PORT || 3000)

require('./sockets')(io)

/* Static files */
app.use(express.static(path.join(__dirname, 'public')))

/* Starting the server */
server.listen(app.get('port'), () => console.log('listening on port', app.get('port')))

