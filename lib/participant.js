var mustache = require('mustache');
var Fighter = require('./fighter');

var doNothing = function(){};
var Participant = module.exports = function(socket){
    this.socket = socket;
    this.code = doNothing;
    this.fighter = new Fighter();
}
var controllerWith = mustache.compile('with(this){ {{{code}}} }');
Participant.prototype.update = function(code){
    var controlCode = controllerWith({ code: code });
    try {
	this.code = Function(controllerWith({ code: code }));
    } catch (error) {
	this.code = doNothing;
    }
}
Participant.prototype.tick = function(){
    try {
	this.code.call(this.fighter);
    } catch(error) {
	console.log(error);
    }
}
Participant.prototype.state = function(){
    return {
	id: this.socket.id,
	x : this.fighter.x,
	y : this.fighter.y
    }
}
Participant.prototype.notify = function(state){
    this.socket.emit('state', state);
}
