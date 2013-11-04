var fighter = (function(CodeMirror){
    var socket = io.connect(window.location.origin);

    var code = document.getElementById('code');
    code.textContent = '/* move ship left */\nleft();'

    var editor = CodeMirror.fromTextArea(code, {
	mode: 'javascript',
	lineNumbers: true
    });
    editor.on('change', function(instance, change){
	socket.emit('change', {
	    timestamp: (new Date()).getTime(),
	    code: instance.getValue()
	});
    });

    var canvas = document.getElementById('top');
    context = canvas.getContext('2d');

    var Fighter = function(context, options) {
	options = options || {};
	this.context = context;
	this.x = options.x || 0;
	this.y = options.y || 0;
	this.width = options.width || 10;
	this.height = options.height || 20;
    }
    Fighter.prototype.draw = function() {
	var context = this.context;
	context.beginPath();
	context.moveTo(this.x, this.y);
	context.lineTo(this.x + this.width/2, this.y + this.height);
	context.lineTo(this.x + this.width, this.y);
	context.closePath();
	context.fill();
    }

    var fighter = new Fighter(context, {
	x: 10,
	y: 10
    });

    var fighters = [];
    (function renderLoop(){
	requestAnimationFrame(renderLoop);
	canvas.width = canvas.width;
	fighters.forEach(function(fighter){
	    fighter.draw();
	})
    })();

    socket.on('state', function(state){
	fighters = state.map(function(object){
	    return new Fighter(context, object)
	});
    });

    return fighter;
})(CodeMirror)
