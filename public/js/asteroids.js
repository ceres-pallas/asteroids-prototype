(function(CodeMirror){
    var code = document.getElementById('code');
    code.textContent = 'function(){ /* do nothing */ }'

    var editor = CodeMirror.fromTextArea(code, {
	mode: 'javascript',
	lineNumbers: true
    });

    var canvas = document.getElementById('top');
    context = canvas.getContext('2d');

    context.beginPath();
    context.moveTo(10,10);
    context.lineTo(15, 30);
    context.lineTo(20, 10);
    context.closePath();

    context.fill();
})(CodeMirror)
