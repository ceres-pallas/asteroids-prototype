var express = require('express');

var app = new express();

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.set('port', process.env.port || 1729);
app.use('/static', express.static(__dirname + '/public'));

server.listen(app.get('port'));

console.log('server started at port %s', app.get('port'));
