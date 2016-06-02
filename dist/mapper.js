(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.mapper = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var mapObject = require('./mapObject');

/**
 * @param {Object|Object[]} data
 * @param {Object}          schema
 * 
 * @returns {Object|Object[]}
 */
module.exports = function (data, schema) {
    if (data instanceof Array) {
        return data.map(function (object) {
            return mapObject(object, schema);
        });
    }

    return mapObject(data, schema);
};
},{"./mapObject":2}],2:[function(require,module,exports){
'use strict';

var mapProperty = require('./mapProperty');

/**
 * @param {Object}   object
 * @param {Object}   schema
 * @param {Object}   [originalObject=object]
 * @param {String[]} [path=[]]
 *
 * @returns {Object}
 */
module.exports = function (object, schema) {
    var originalObject = arguments.length <= 2 || arguments[2] === undefined ? object : arguments[2];
    var path = arguments.length <= 3 || arguments[3] === undefined ? [] : arguments[3];

    var mappedObject = {};

    Object.keys(schema).forEach(function (propertyName) {
        var propertySchema = schema[propertyName];
        var propertyValue = object && object[propertyName];
        var propertyPath = path.concat(propertyName);

        var mappedPropertyValue = mapProperty(propertyValue, propertySchema, object, originalObject, propertyPath);

        if (mappedPropertyValue !== undefined) {
            mappedObject[propertyName] = mappedPropertyValue;
        }
    });

    return mappedObject;
};
},{"./mapProperty":3}],3:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var getPropertyValue = require('./utils').getPropertyValue;

/**
 * @param {*}            value
 * @param {*}            schema
 * @param {Object|Array} parentObject
 * @param {Object}       originalObject
 * @param {String[]}     path
 *
 * @returns {*}
 */
module.exports = function mapProperty(value, schema, parentObject, originalObject, path) {
    if (schema === true || schema === '=') {
        return value;
    }

    if (typeof schema === 'string') {
        var propertyPath = schema.startsWith('=') ? schema.substr(1) : schema;
        return getPropertyValue(originalObject, parentObject, propertyPath);
    }

    if (schema instanceof Function) {
        return schema(value, parentObject, originalObject, path);
    }

    if (schema instanceof Array && value instanceof Array) {
        var _ret = function () {
            var mappedArray = [];
            var itemSchema = schema[0];

            value.forEach(function (item, i) {
                var itemPath = path.concat(i);
                var mappedItem = mapProperty(item, itemSchema, value, originalObject, itemPath);

                if (mappedItem !== undefined) {
                    mappedArray.push(mappedItem);
                }
            });

            return {
                v: mappedArray
            };
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    }

    if (schema instanceof Object) {
        var mapObject = require('./mapObject');
        return mapObject(value, schema, originalObject, path);
    }
};
},{"./mapObject":2,"./utils":5}],4:[function(require,module,exports){
'use strict';

var map = require('./map');

/**
 * @param {Object|Object[]} schemaOrData
 * @param {Object}          [schema]
 *
 * @returns {Function|Object|Object[]}
 */
module.exports = function (schemaOrData, schema) {
    if (!schema) {
        return function (value) {
            return map(value, schemaOrData);
        };
    }

    return map(schemaOrData, schema);
};
},{"./map":1}],5:[function(require,module,exports){
'use strict';

/**
 * @param {Object} originalObject
 * @param {Object} parentObject
 * @param {String} path
 *
 * @returns {*}
 */

exports.getPropertyValue = function (originalObject, parentObject, path) {
    var value = void 0;

    if (path.startsWith('$.')) {
        path = path.substr(2);
        value = originalObject;
    } else {
        value = parentObject;
    }

    var pathParts = path.split('.');

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = pathParts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var pathPart = _step.value;

            if (!(value instanceof Object)) {
                return;
            }

            value = value[pathPart];
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return value;
};
},{}]},{},[4])(4)
});