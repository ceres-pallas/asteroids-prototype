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
	this.vx = options.vx || 3;
	this.vy = options.vy || 3;
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
    Fighter.prototype.wrap = function(){
	this.wrapX();
	this.wrapY();
    }
    Fighter.prototype.wrapX = function(){
	if (this.x > canvas.width) {
	    this.x -= canvas.width;
	}
	if (this.x < 0) {
	    this.x += canvas.width;
	}
    }
    Fighter.prototype.wrapY = function(){
	if (this.y > canvas.height) {
	    this.y -= canvas.height;
	}
	if (this.y < 0) {
	    this.y += canvas.height;
	}
    }
    Fighter.prototype.left = function(){
	this.x -= this.vx;
	this.wrap();
    }
    Fighter.prototype.right = function(){
	this.x += this.vx;
	this.wrap();
    }
    Fighter.prototype.down = function(){
	this.y -= this.vy;
	this.wrap();
    }
    Fighter.prototype.up = function(){
	this.y += this.vy;
	this.wrap();
    }

    var fighter = new Fighter(context, {
	x: 10,
	y: 10
    });

    var template = pico('with(this){ {{code}} }');
    var controller = function() {
	var controlCode = template({ code: editor.getValue() });
	return Function(controlCode);
    };

    (function renderLoop(){
	requestAnimationFrame(renderLoop);
	canvas.width = canvas.width;
	controller().call(fighter);
	fighter.draw();
    })();

    var triggered = false;
    socket.on('state', function(state){
	if (!triggered) {
	    console.log(state);
	    triggered = true;
	}
    });

    return fighter;
})(CodeMirror)
