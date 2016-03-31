const mapObject = require('./mapObject');

/**
 * @param {Object|Object[]} value
 * @param {Object}          schema
 */
module.exports = function(value, schema) {
    if (value instanceof Array) {
        return value.map(object => mapObject(object, schema));
    }

    return mapObject(value, schema);
};