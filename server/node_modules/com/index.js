/*jslint node:true*/
'use strict';

var words = require('./words.js'),
    Com;

Com = function () {

    /**
     * Array of all the data
     *
     * @private
     * @type {Array}
     */
    this.data = [];

    /**
     * This variable holds the mapFunctions
     *
     * @private
     * @type {Object}
     */
    this.mapFunctions = {};

    /**
     * Structure of this variable is as follows:
     * @example content
     * {
         *   mapName: {
         *     indexValue: [object1, object2, ...]
         *   },
         *   anotherMapName: {
         *     indexValue: [],
         *     anotherIndexValue: [],
         *     ...
         *   }
         * }
     *
     * @private
     * @type {Object}
     */
    this.maps = {};

    /**
     * @example content
     * {
         *   1: { //all indexes
         *      'id': 1,
         *      'parent': 3,
         *      'color': 'red'
         *   }
         * }
     *
     * @private
     * @type {Object}
     */
    this.mapValues = {};

};

Object.defineProperties(Com, {
    /**
     * The same as `new Com()`;
     *
     * @return {Com}
     */
    create: {
        value: function () {
            return new Com();
        }
    }
});

Com.prototype = Object.create({}, {

    addMapper: {
        /**
         * Specify the map function.
         * Map function takes two arguments: the object and emit function
         * emit function takes 2 arguments: the index and the object to store on that index;
         *
         * @public
         * @param {String} mapName
         * @param {Function(object, emit)} callback
         * @return {Com}
         */
        value: function (mapName, callback) {
            this.mapFunctions[mapName] = callback;
            this.maps[mapName] = {};
            this.each(function (object) {
                this.addObjectToMap(mapName, object);
            });
            return this;
        }
    },

    add: {
        /**
         * adds the object
         *
         * @public
         * @param {Object} object
         * @return {Com}
         */
        value: function (object) {
            object.id = object.id || this.generateId();
            this.data.push(object);
            this.mapValues[object.id] = {};
            this.eachMap(function (map, mapName) {
                this.addObjectToMap(mapName, object);
            });
            return this;
        }
    },

    remove: {
        /**
         * Removes the object
         *
         * @public
         * @param {Object} object
         * @return {Com}
         */
        value: function (object) {
            var index = this.data.indexOf(object);
            if (index !== -1) {
                this.data.splice(index, 1);
            }
            this.eachMap(function (map, mapName) {
                this.removeObjectFromMap(mapName, object);
            });
            delete this.mapValues[object.id];
            return this;
        }
    },

    update: {
        /**
         * Removes and adds the object
         *
         * @public
         * @param {Object} object
         * @return {Com}
         */
        value: function (object) {
            this.remove(object);
            this.add(object);
            return this;
        }
    },

    generateId: {
        /**
         * Generate random, unique id
         *
         * @private
         * @param {String} [id=null]
         * @param {Number} [length=8]
         * @return {String}
         */
        value: function (id, length) {
            length = length || 8;

            id = id || words.generate(length);

            while (this.mapValues[id] !== undefined) {
                id = words.generate(length);
                length += 1;
            }

            return id.toString();
        }
    },

    addMany: {
        /**
         * @public
         * @param {Object[]} array Array of objects to store
         * @return {Com}
         */
        value: function (array) {
            var i;

            for (i = 0; i < array.length; i += 1) {
                this.add(array[i]);
            }

            return this;
        }
    },

    by: {
        /**
         * Returns all the records stored in the `mapName` with the map value
         * equal to `index`
         *
         * @public
         * @param {String} mapName
         * @param {String} index
         * @return {Object[]}
         */
        value: function (mapName, index) {
            if (this.maps[mapName][index] === undefined) {
                return [];
            }
            return this.maps[mapName][index].slice(); //slice() makes a copy of the array
        }
    },

    all: {
        /**
         * Returns array of all the objects
         *
         * @return {Object[]}
         */
        value: function () {
            return this.data.slice();//slice() makes a copy of the array
        }
    },

    eachMap: {
        /**
         * Iterates through all the maps
         *
         * @private
         * @param {Function(Object[], String)} callback
         */
        value: function (callback) {
            var mapName;

            for (mapName in this.maps) {
                if (this.maps.hasOwnProperty(mapName)) {
                    callback.call(this, this.maps[mapName], mapName);
                }
            }
        }
    },

    each: {
        /**
         * Iterates through all the objects
         *
         * @public
         * @param {Function(Object, Number)} callback
         * @return {Com}
         */
        value: function (callback) {
            var i;

            for (i = 0; i < this.data.length; i += 1) {
                callback.call(this, this.data[i], i);
            }
            return this;
        }
    },

    addObjectToMap: {
        /**
         * Adds object to `mapName` map
         *
         * @private
         * @param {String} mapName
         * @param {Object} object
         * @return {Com}
         */
        value: function (mapName, object) {
            var mapFunction = this.mapFunctions[mapName],
                index,
                value,
                emit = function (idx, val) {
                    index = idx;
                    value = val;
                };

            mapFunction.call(object, object, emit);

            if (this.maps[mapName][index] === undefined) {
                this.maps[mapName][index] = [];
            }
            this.maps[mapName][index].push(value);
            this.mapValues[object.id][mapName] = index;
            return this;
        }
    },

    removeObjectFromMap: {
        /**
         * Removes object from `mapName` map
         *
         * @private
         * @param {String} mapName
         * @param {Object} object
         * @return {Com}
         */
        value: function (mapName, object) {
            var mapValue = this.mapValues[object.id][mapName],
                index = this.maps[mapName][mapValue].indexOf(object);

            if (index !== -1) {
                this.maps[mapName][mapValue].splice(index, 1);
            }

            return this;
        }
    }

});

module.exports = Com;