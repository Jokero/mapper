'use strict';

/**
 * @param {Object} originalObject
 * @param {Object} parentObject
 * @param {String} path
 *
 * @returns {*}
 */
exports.getPropertyValue = function(originalObject, parentObject, path) {
    let value;
    
    if (path.startsWith('$.')) {
        path  = path.substr(2);
        value = originalObject;
    } else {
        value = parentObject;
    }

    const pathParts = path.split('.');

    for (let pathPart of pathParts) {
        if (!(value instanceof Object)) {
            return;
        }

        value = value[pathPart];
    }

    return value;
};