module.exports = {
    clone: function(obj) {
        if (null == obj || "object" != typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    },
    /**
     * Got from: http://stackoverflow.com/a/8052100
     *
     * @param obj
     * @param desc
     * @returns {*}
     */
    dotNotation: function(obj, desc) {
        var arr = desc.split('.');
        while(arr.length && (obj = obj[arr.shift()]));
        return obj;
    },
    getType: function(object) {
        var funcNameRegex = /function (.{1,})\(/;
        if(typeof object == 'undefined') { return undefined; }
        if(object == null) { return null };
        var results = (funcNameRegex).exec((object).constructor.toString());
        return (results && results.length > 1) ? results[1] : "";
    },
    merge: function(object1, object2) {
        var returnObject = {};
        Object.keys(object1).forEach((name) => {
            returnObject[name] = object1[name];
        });
        Object.keys(object2).forEach((name) => {
            returnObject[name] = object2[name];
        });

        return returnObject;
    },
    filter: function(object, filter) {
        var returnObject = {};
        Object.keys(object).filter((value, index, array) => filter(object[value], value, object)).forEach((key) => {
            returnObject[key] = object[key];
        });

        return returnObject;
    },
    filter: (object, callback) => {
        var returnObject = {};
        Object.keys(object).forEach((index) => {
            if(callback(object[index], index, object)) {
                returnObject[index] = object[index];
            }
        });

        return returnObject;
    },
    compare: (object1, object2, exclude) => {
        if(typeof exclude == 'undefined') {
            exclude = [];
        }

        var keys = Object.keys(object1).filter((index) => exclude.indexOf(index) == -1);
        for(var a = 0; a < keys.length; a++) {
            if(Obj.getType(object1[keys[a]]) == 'Object' && !Obj.compare(object1[keys[a]], object2[keys[a]], exclude) || (object1[keys[a]] != object2[keys[a]])) {
                return false;
            }
        }

        return true;
    }
};