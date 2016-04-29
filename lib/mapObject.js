'use strict';

const mapProperty = require('./mapProperty');

/**
 * @param {Object}   object
 * @param {Object}   schema
 * @param {Object}   [originalObject=object]
 * @param {String[]} [path=[]]
 *
 * @returns {Object}
 */
module.exports = function(object, schema, originalObject, path) {
    originalObject = originalObject || object;
    path           = path || [];
    
    if (object && object.toJSON instanceof Function) {
        object = object.toJSON();
    }

    const mappedObject = {};
    
    Object.keys(schema).forEach(propertyName => {
        const propertySchema = schema[propertyName];
        const propertyValue  = object && object[propertyName];
        const propertyPath   = path.concat(propertyName);

        const mappedPropertyValue = mapProperty(propertyValue, propertySchema, object, originalObject, propertyPath);

        if (mappedPropertyValue !== undefined) {
            mappedObject[propertyName] = mappedPropertyValue;
        }
    });

    return mappedObject;
};