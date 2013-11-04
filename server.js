var express = require('express');

var app = new express();

app.set('port', process.env.port || 1729);
app.listen(app.get('port'));

console.log('server started at port %s', app.get('port'));
