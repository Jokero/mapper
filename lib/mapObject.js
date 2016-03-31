/**
 * @param {Object}   object
 * @param {Object}   schema
 * @param {Object}   [allObject=object]
 * @param {String[]} [path=[]]
 *
 * @returns {Object}
 */
module.exports = function mapObject(object, schema, allObject=object, path=[]) {
    if (object.toJSON instanceof Function) {
        object = object.toJSON();
    }

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
        } else if (propertySchema instanceof Function) {
            mappedPropertyValue = propertySchema(propertyValue, object, allObject, propertyPath);
        } else if (propertySchema instanceof Array && propertyValue instanceof Array) {
            mappedPropertyValue = propertyValue.map((object, i) => {
                const schema = propertySchema[0];
                const path   = propertyPath.concat(i);
                return mapObject(object, schema, allObject, path);
            });
        } else if (propertySchema instanceof Object && propertyValue instanceof Object) {
            mappedPropertyValue = mapObject(propertyValue, propertySchema, allObject, propertyPath);
        }

        if (mappedPropertyValue !== undefined) {
            mappedObject[propertyName] = mappedPropertyValue;
        }
    });

    return mappedObject;
};