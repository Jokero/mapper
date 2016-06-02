'use strict';

const mapObject = require('./mapObject');

/**
 * @param {Object|Object[]} data
 * @param {Object}          schema
 * 
 * @returns {Object|Object[]}
 */
module.exports = function(data, schema) {
    if (data instanceof Array) {
        return data.map(object => mapObject(object, schema));
    }

    return mapObject(data, schema);
};