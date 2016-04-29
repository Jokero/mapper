const map    = require('../../lib/map');
const expect = require('chai').expect;

describe('map', function() {
    it('returns array if value is array', function() {
        const value       = [{ a: 1 }, { a: 2 }];
        const schema      = { a: true };
        const mappedValue = map(value, schema);

        expect(mappedValue).to.be.an.instanceof(Array);
    });

    it('returns object if value is object', function() {
        const value       = { a: 1 };
        const schema      = { a: true };
        const mappedValue = map(value, schema);

        expect(mappedValue).to.be.an.instanceof(Object);
        expect(mappedValue).to.not.be.an.instanceof(Array);
    });
});