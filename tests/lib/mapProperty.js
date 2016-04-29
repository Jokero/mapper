const mapProperty = require('../../lib/mapProperty');
const expect      = require('chai').expect;

describe('mapProperty', function() {
    it('returns value without changes if schema is true', function() {
        const value       = 'Zootopia';
        const schema      = true;
        const mappedValue = mapProperty(value, schema);

        expect(mappedValue).to.equal(value);
    });

    it('returns another property if schema is string', function() {
        const object = {
            title:        'Zootopia',
            russianTitle: 'Зверополис'
        };
        const value  = object.title;
        const schema = 'russianTitle';

        const mappedValue = mapProperty(value, schema, object);

        expect(mappedValue).to.equal(object.russianTitle);
    });

    it('returns function call result if schema is function', function() {
        const value  = 'Zootopia';
        const schema = function(propertyValue, parentObject, originalObject, path) {
            // expect(propertyValue).to.equal(value);
            // expect(propertyValue).to.equal(value);
            
            return 'Зверополис';
        };

        const mappedValue = mapProperty(value, schema);

        expect(mappedValue).to.equal('Зверополис');
    });
});