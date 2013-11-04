var Participant = require('./participant');

var Game = module.exports = function(){
    this.participants = {};
}
Game.prototype.addParticipant = function(socket){
    var id = socket.id;
    console.log('added %s', id);
    this.participants[id] = new Participant(socket)
}
Game.prototype.removeParticipant = function(id){
    console.log('remove %s', id);
    delete this.participants[id];
}
Game.prototype.update = function(id, code){
    this.participants[id].update(code);
}
Game.prototype.tick = function() {
    for (var id in this.participants) {
	var participant = this.participants[id];
	participant.tick();
    }
}
Game.prototype.notify = function() {
    var state = this.state();
    for (var id in this.participants) {
	var participant = this.participants[id];
	participant.notify(state);
    }
}
Game.prototype.state = function(){
    var fighters = [];
    for (var id in this.participants) {
	var participant = this.participants[id];
	fighters.push(participant.state());
    }
    return fighters;
}
