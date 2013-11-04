var express = require('express');

var app = new express();

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var Game = require('./lib/game');

app.set('port', process.env.port || 1729);
app.use('/static', express.static(__dirname + '/public'));

var game = new Game();

io.sockets.on('connection', function(socket){
    game.addParticipant(socket);

    socket.on('change', function(change){
	game.update(socket.id, change.code);
    });

    socket.on('disconnect', function(){
	game.removeParticipant(socket.id);
    });
});

var interval = setInterval(function(){
    game.tick();
    game.notify();
}, 1000/60);

server.listen(app.get('port'));

console.log('server started at port %s', app.get('port'));
