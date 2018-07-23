/*
 * Author      :  Jackson Currie
 * Date        :  2018-06-26
 * Description :  The server that controls the Roboarm
 */

// Librarys
const express = require('express');
const app = express();
const path = require('path');
const io = require('socket.io')();
const Gpio = require('pigpio').Gpio;

// Servo Details
const rot = new Gpio(3, {mode: Gpio.OUTPUT});
const forw = new Gpio(15, {mode: Gpio.OUTPUT});
const up = new Gpio(27, {mode: Gpio.OUTPUT});

// Start with roboarm in centre
var rotValue = 1240;
var forwValue = 1200;
var upValue = 2000;

// Move servos to centre
rot.servoWrite(forwValue);
up.servoWrite(upValue);
rot.servoWrite(rotValue);

// Static files
app.use('/styles', express.static('styles'));
app.use('/scripts', express.static('scripts'));
app.use('/images', express.static('images'));

// Home page
app.get('/', (req, res) => 
  res.sendFile(path.join(__dirname, 'views/index.html'))
);

// Control page
app.get('/control', (req, res) => 
  res.sendFile(path.join(__dirname, 'views/control.html'))
);

// About page
app.get('/about', (req, res) => 
  res.sendFile(path.join(__dirname, 'views/about.html'))
);

// Start server on port 8080
var server = app.listen(8080, () =>
  console.log("Listening on port 8080")
);

io.attach(server);

// User connected
io.sockets.on('connection', (socket) => {

  // Load position of servos
  socket.emit('valueRotate', rotValue);
  socket.emit('valueForward', forwValue);
  socket.emit('valueUp', upValue);

  // When rotate position is moved
  socket.on('rotate', (data) => {
    // Set the new value
    rotValue = data;
    rot.servoWrite(rotValue);
    io.emit('valueRotate', rotValue);
  });

  // When forward position is moved
  socket.on('forward', (data) => {
    // Set the new value
    forwValue = data;
    forw.servoWrite(forwValue);
    io.emit('valueForward', forwValue);
  });

  // When up position is moved
  socket.on('up', (data) => {
    // Set the new value
    upValue = data;
    up.servoWrite(upValue);
    io.emit('valueUp', upValue);
  });
});