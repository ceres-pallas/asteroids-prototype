var pico = function(template){
    var _regexp = /\{\{(\w*)\}\}/g;
    return function(data) {
        return template.replace(_regexp, function(str, key){
            return data[key];
        });
    }
};
