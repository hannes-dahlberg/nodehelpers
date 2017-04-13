module.exports = {
    //Search replace in string
    replace: function(search, replace, subject) {
        var map = {};
        for(var a = 0; a < search.length; a++) {
            map[search[a].toLowerCase()] = replace[a];
        }
        return subject.replace(new RegExp(search.join('|'), 'gi'), function(matched){
            return map[matched.toLowerCase()];
        });
    },
    //Substr that works like the substr for PHP (negative values allowed)
    substr: function(string, start, stop) {
        string = String(string);
        if(start < 0) {
            start = string.length + start;
        }
        if(stop < 0) {
            stop = string.length + stop - start;
        }

        return string.substr(start, stop);
    },
    //Uppercase the first letter in string
    ucFirst: function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
};