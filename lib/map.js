'use strict';

var mapObject = require('./mapObject');

/**
 * @param {Object|Object[]} data
 * @param {Function|Object} schema
 * 
 * @returns {Object|Object[]}
 */
module.exports = function (data, schema) {
    if (data instanceof Array) {
        return data.map(function (object) {
            var resolvedSchema = schema instanceof Function ? schema(object) : schema;
            return mapObject(object, resolvedSchema);
        });
    }

    var resolvedSchema = schema instanceof Function ? schema(data) : schema;
    return mapObject(data, resolvedSchema);
};