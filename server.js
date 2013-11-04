var express = require('express');

var app = new express();

app.use('/static', express.static(__dirname + '/public'));

app.set('port', process.env.port || 1729);
app.listen(app.get('port'));

console.log('server started at port %s', app.get('port'));
