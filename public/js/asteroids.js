(function(CodeMirror){
    var code = document.getElementById('code');
    code.textContent = 'function(){ /* do nothing */ }'

    var editor = CodeMirror.fromTextArea(code, {
	mode: 'javascript',
	lineNumbers: true
    });
})(CodeMirror)
