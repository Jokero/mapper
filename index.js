'use strict';

const map = require('./lib/map');

/**
 * @param {Object|Object[]} schemaOrData
 * @param {Object}          [schema]
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