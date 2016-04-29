'use strict';

const map = require('./lib/map');

/**
 * @param {Object|Object[]} schemaOrValue
 * @param {Object}          [schema]
 *
 * @returns {Function|Object|Object[]}
 */
module.exports = function(schemaOrValue, schema) {
    if (!schema) {
        return function(value) {
            return map(value, schemaOrValue);
        };
    }

    return map(schemaOrValue, schema);
};