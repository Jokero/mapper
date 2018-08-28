'use strict';

const map = require('./map');

/**
 * @param {Function|Object|Object[]} schemaOrData
 * @param {Function|Object}          [schema]
 *
 * @returns {Function|Object|Object[]}
 */
module.exports = function(schemaOrData, schema) {
    if (!schema) {
        return function(value) {
            return map(value, schemaOrData);
        };
    }

    return map(schemaOrData, schema);
};