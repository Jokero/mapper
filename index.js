const map = require('./lib/map');

// todo: надо ли делать полностью новый объект? чтобы при изменении любого свойства оно не менялось в исходном объекте

/**
 * @param {Object|Object[]} schemaOrValue
 * @param {Object}          [schema]
 *
 * @returns {Function|Object}
 */
module.exports = function(schemaOrValue, schema) {
    if (schema === undefined) {
        return function(value) {
            return map(value, schemaOrValue);
        };
    }

    return map(schemaOrValue, schema);
};