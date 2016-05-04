'use strict';

const map    = require('../../lib/map');
const expect = require('chai').expect;

describe('map', function() {
    it('returns array of objects if value is array of objects', function() {
        const data       = [{ a: 1 }, { a: 2 }];
        const schema     = { a: true };
        const mappedData = map(data, schema);

        expect(mappedData).to.be.an.instanceof(Array);
    });

    it('returns object if value is object', function() {
        const data       = { a: 1 };
        const schema     = { a: true };
        const mappedData = map(data, schema);

        expect(mappedData).to.be.an.instanceof(Object);
        expect(mappedData).to.not.be.an.instanceof(Array);
    });
});