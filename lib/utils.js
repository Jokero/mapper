'use strict';

/**
 * @param {Object} originalObject
 * @param {Object} parentObject
 * @param {String} path
 *
 * @returns {*}
 */

exports.getPropertyValue = function (originalObject, parentObject, path) {
    var value = void 0;

    if (path.startsWith('$.')) {
        path = path.substr(2);
        value = originalObject;
    } else {
        value = parentObject;
    }

    var pathParts = path.split('.');

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = pathParts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var pathPart = _step.value;

            if (!(value instanceof Object)) {
                return;
            }

            value = value[pathPart];
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return value;
};