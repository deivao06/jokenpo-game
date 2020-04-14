import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import createMatch from "./public/Match.js";

const app = express();
const server = http.createServer(app);
const sockets = socketio(server);

var match = createMatch();

match.subscribe((object) => {
    console.log(`> Emiting ${object.type}`);
    sockets.emit(object.type, object);
});

app.use(express.static('public'));

sockets.on('connection', (socket) => {
    var socketId = socket.id;
    console.log(`Player connected on Server with id ${socketId}`);

    match.addPlayer({id: socketId, name: `Random ${Math.floor(Math.random() * 100)}`});
    socket.emit('setup', match.state);

    socket.on('disconnect', () => {
        match.removePlayer({id: socketId});
        console.log(`> Player disconnected: ${socketId}`);
    });

    socket.on('set-player-option', (option) => {
        match.setPlayerOption({id: socketId, option: option});
    })
});

server.listen(8000, () => {
    console.log('> Server listening on port: 8000');
});