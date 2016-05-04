'use strict';

const mapObject = require('../../lib/mapObject');
const expect    = require('chai').expect;

describe('mapObject', function() {
    it('does not add undefined properties to result object', function() {
        const object = {
            a: 'a',
            b: 'b'
        };
        
        const schema = {
            a: true,
            b: () => {} // return nothing (i.e., undefined)
        };
        
        const mappedObject = mapObject(object, schema);

        expect(mappedObject).to.deep.equal({ a: 'a' });
    });

    it('calls toJSON() if present and uses returned value to map', function() {
        const object = {
            a: 'a',
            b: 'b',

            toJSON: () => ({
                a: 'a2',
                b: 'b2'
            })
        };

        const schema = {
            a: true,
            b: true
        };

        const mappedObject = mapObject(object, schema);

        expect(mappedObject).to.deep.equal({
            a: 'a2',
            b: 'b2'
        });
    });
});