const mapObject = require('./lib/mapObject');

// todo: надо ли делать полностью новый объект? чтобы при изменении любого свойства оно не менялось в исходном объекте

/**
 * @param {Object} schemaOrObject
 * @param {Object} [schema]
 *
 * @returns {Object}
 */
module.exports = function(schemaOrObject, schema) {
    if (schema === undefined) {
        return function(object) {
            return mapObject(object, schemaOrObject, object, []);
        };
    }
    
    return mapObject(schemaOrObject, schema, schemaOrObject, []);
};