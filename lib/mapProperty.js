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