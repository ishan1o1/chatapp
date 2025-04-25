const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log(`User connected:${socket.id}`);

  socket.on('chat-message', (msg) => {
    console.log('Message received: ' + msg);
    socket.broadcast.emit('chat-message', {
      message: msg,
      id: socket.id, 
    });
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected:${socket.id}`);
  });
});

server.listen(3000, '0.0.0.0', () => {
  console.log('Server listening on all IPs:3000');
});

