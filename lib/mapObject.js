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