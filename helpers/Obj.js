var Obj = {
    clone: function(obj) {
        if (null == obj || "object" != typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    },
    /**
     * OShortcut for getObjPath
     */
    dotNotation: function(obj, desc) {
        return this.getObjPath(obj, desc, '.');
    },
    /**
     * Shortcut for setObjPath
     */
    setDotNotation: function(obj, desc, value) {
        return this.setObjPath(obj, desc, value, '.')
    },
    /**
     * Highly useful functions copied from:
     * http://likerrr.ru/on-air/adding-string-with-dot-notation-as-a-key-to-javascript-objects
     *
     * Sets the value of an object using string dot notation. Object provided will be updated
     * so no need to use the return value
     *
     * @param {Object} obj The object to operate on
     * @param {String} path notation path as string
     * @param {*} value to set
     * @param {String} notation Notation separator (default ".")
     * @returns {*} return the modified object
     */
    setObjPath(obj, path, value, notation) {
        function isObject(obj) { return (Object.prototype.toString.call(obj) === '[object Object]' && !!obj);}
        notation = notation || '.';
        path.split(notation).reduce(function (prev, cur, idx, arr) {
            var isLast = (idx === arr.length - 1);
            // if <cur> is last part of path
            if (isLast) return (prev[cur] = value);
            // if <cur> is not last part of path, then returns object if existing value is object or empty object
            return (isObject(prev[cur])) ? prev[cur] : (prev[cur] = {});
        }, obj);

        return obj;
    },
    /**
     * Highly useful functions copied from:
     * http://likerrr.ru/on-air/adding-string-with-dot-notation-as-a-key-to-javascript-objects
     *
     * Get value from and object using a string as dot notation reference
     *
     * @param {Object} obj The object to search
     * @param {String} path notation path as string
     * @param {String} notation notation Notation separator (default ".")
     * @returns {*} return the value or undefined if not found
     */
    getObjPath(obj, path, notation) {
        notation = notation || '.';
        return path.split(notation).reduce(function(prev, cur) {
            return (prev !== undefined) ? prev[cur] : undefined;
        }, obj);
    },
    getType: function(object) {
        if(typeof object == 'undefined') { return undefined; }

        var funcNameRegex = /function (.{1,})\(/;
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

module.exports = Obj