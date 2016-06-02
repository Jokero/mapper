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
module.exports = function (object, schema, originalObject, path) {
    originalObject = originalObject || object;
    path = path || [];

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