'use strict';

const mapProperty = require('../../lib/mapProperty');
const expect      = require('chai').expect;

describe('mapProperty', function() {
    const object = {
        a: {
            b: {
                c: 'c'
            },
            e: [
                { f: 'f1', g: 'g1' },
                { f: 'f2', g: 'g2' }
            ]
        },

        x: 'x',
        y: 'y'
    };

    describe('returns value as it is', function() {
        it('if schema is true', function() {
            const value       = object.x;
            const schema      = true;
            const mappedValue = mapProperty(value, schema);

            expect(mappedValue).to.equal(value);
        });

        it('if schema is "="', function() {
            const value       = object.x;
            const schema      = '=';
            const mappedValue = mapProperty(value, schema);

            expect(mappedValue).to.equal(value);
        });
    });

    describe('returns property at path', function() {
        it('if schema is string', function() {
            const value  = object.x;
            const schema = 'y';

            const mappedValue = mapProperty(value, schema, object);

            expect(mappedValue).to.equal(object.y);
        });

        it('if schema is string with prefix "="', function() {
            const value  = object.x;
            const schema = '=y';

            const mappedValue = mapProperty(value, schema, object);

            expect(mappedValue).to.equal(object.y);
        });
    });

    it('returns function call result if schema is a function', function() {
        const value          = object.a.b.c;
        const parentObject   = object.a.b;
        const originalObject = object;
        const path           = ['a', 'b', 'c'];

        const schema = function(propertyValue, propertyParentObject, propertyOriginalObject, propertyPath) {
            expect(propertyValue).to.equal(value);
            expect(propertyParentObject).to.deep.equal(parentObject);
            expect(propertyOriginalObject).to.deep.equal(originalObject);
            expect(propertyPath).to.deep.equal(path);
            
            return 'newValue';
        };

        const mappedValue = mapProperty(value, schema, parentObject, originalObject, path);

        expect(mappedValue).to.equal('newValue');
    });

    it('returns object if schema is object', function() {
        const value = object.a.b;
        
        const schema = {
            c: true,
            d: () => 'd'
        };

        const mappedValue = mapProperty(value, schema);

        expect(mappedValue).to.deep.equal({
            c: 'c',
            d: 'd'
        });
    });
    
    it('works with array of objects', function() {
        const value          = object.a.e;
        const parentObject   = object.a;
        const originalObject = object;
        const path           = ['a', 'e'];

        const schema = [{
            f: true
        }];

        const mappedValue = mapProperty(value, schema, parentObject, originalObject, path);

        expect(mappedValue).to.deep.equal([
            { f: 'f1' },
            { f: 'f2' }
        ]);
    });
});