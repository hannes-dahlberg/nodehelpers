var Obj = require('./Obj');

module.exports = {
    //Return true if object is array
    isArray: function(object) {
        return Object.prototype.toString.call(object) == '[object Array]';
    },
    //Flatten array to a specific level
    flatten: function(array, level) {
        if(typeof level == 'undefined') { level = 0; }

        var returnArray = [];

        var levelCheck = (array, level) => {
            if(level > 0 && this.isArray(array)) {
                return levelCheck(array[0], --level);
            } else {
                return this.isArray(array);
            }
        }

        array.forEach((item) => {
            if(this.isArray(item)) {
                if(!levelCheck(item, level)) {
                    returnArray.push(item);
                } else {
                    returnArray = returnArray.concat(this.flatten(item, level));
                }
            }
            else if(this.isArray(item)) {
            } else {
                returnArray.push(item);
            }
        });

        return returnArray;
    },
    //Group an array on a specific key value and return an object
    groupBy: function groupBy(array, keys) {
        if(['String', 'Object'].indexOf(Obj.getType(keys)) != -1) { keys = [keys]; }

        var currentKey = keys[0];
        var firstOnly = false;
        if(Obj.getType(currentKey) == 'Object') {
            firstOnly = currentKey.firstOnly;
            currentKey = currentKey.name;
        }

        var groups = {};
        if(Obj.getType(array) == 'Object') {
            array = [array];
        }
        array.forEach((item) => {
            if(typeof groups[item[currentKey]] == 'undefined') {
                groups[item[currentKey]] = [];
            }

            groups[item[currentKey]].push(item);
        });

        Object.keys(groups).forEach((index) => {
            if(groups[index].length == 1 || firstOnly) {
                groups[index] = groups[index][0];
            }
        });

        if(keys.length > 1) {
            Object.keys(groups).forEach((index) => {
                groups[index] = groupBy(groups[index], keys.slice(1, keys.length));
            });
        }

        return groups;
    },
    //Compare two arrays with each other using the compare function in the Obj helper
    compare: function(array1, array2, exclude) {
        for(var a = 0; a < array1.length; a++) {
            if(!Obj.compare(array1[a], array2[a], exclude)) {
                return false;
            }
        }

        return true;
    }
};