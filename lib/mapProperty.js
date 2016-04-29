'use strict';

const getPropertyValue = require('./utils').getPropertyValue;

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
        const propertyPath = schema.startsWith('=') ? schema.substr(1) : schema;
        return getPropertyValue(originalObject, parentObject, propertyPath);
    }

    if (schema instanceof Function) {
        return schema(value, parentObject, originalObject, path);
    }

    if (schema instanceof Array && value instanceof Array) {
        const mappedArray = [];
        const itemSchema  = schema[0];

        value.forEach((item, i) => {
            const itemPath   = path.concat(i);
            const mappedItem = mapProperty(item, itemSchema, value, originalObject, itemPath);

            if (mappedItem !== undefined) {
                mappedArray.push(mappedItem);
            }
        });

        return mappedArray;
    }

    if (schema instanceof Object) {
        const mapObject = require('./mapObject');
        return mapObject(value, schema, originalObject, path);
    }
};