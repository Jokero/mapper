const map = require('./lib/map');

// todo: надо ли делать полностью новый объект? чтобы при изменении любого свойства оно не менялось в исходном объекте

/**
 * @param {Object} schemaOrObject
 * @param {Object} [schema]
 *
 * @returns {Function|Object}
 */
module.exports = function(schemaOrObject, schema) {
    if (schema === undefined) {
        return function(object) {
            return map(object, schemaOrObject, object, []);
        };
    }
    
    return map(schemaOrObject, schema, schemaOrObject, []);
};
