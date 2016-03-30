/**
 * @param {Object}   object
 * @param {Object}   schema
 * @param {Object}   allObject
 * @param {String[]} path
 *
 * @returns {Object}
 */
module.exports = function map(object, schema, allObject, path) {
    const mappedObject = {};

    Object.keys(schema).forEach(propertyName => {
        const propertySchema = schema[propertyName];
        const propertyValue  = object[propertyName];
        const propertyPath   = path.concat(propertyName);

        let mappedPropertyValue;

        if (propertySchema === true) {
            mappedPropertyValue = propertyValue;
        } else if (typeof propertySchema === 'string') {
            mappedPropertyValue = object[propertySchema];
        } else if (typeof propertySchema === 'function') {
            mappedPropertyValue = propertySchema(propertyValue, object, allObject, propertyPath);
        } else if (typeof propertySchema === 'object' && typeof propertyValue === 'object') {
            mappedPropertyValue = map(propertyValue, propertySchema, allObject, propertyPath);
        }

        if (mappedPropertyValue !== undefined) {
            mappedObject[propertyName] = mappedPropertyValue;
        }
    });

    return mappedObject;
};