var fighter = (function(CodeMirror){
    var code = document.getElementById('code');
    code.textContent = 'function(){ /* do nothing */ }'

    var editor = CodeMirror.fromTextArea(code, {
	mode: 'javascript',
	lineNumbers: true
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

    (function renderLoop(){
	requestAnimationFrame(renderLoop);
	canvas.width = canvas.width;
	fighter.draw();
    })();

    return fighter;
})(CodeMirror)
