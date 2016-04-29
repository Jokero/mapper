const mapper = require('..');
const expect = require('chai').expect;

describe('mapper', function() {
    it('returns function if value is not specified', function() {
        const schema      = { a: true };
        const mapFunction = mapper(schema);

        const value       = { a: 1, b: 1 };
        const mappedValue = mapFunction(value);

        expect(mappedValue).to.be.deep.equal({ a: 1 });

    });

    it('returns mapped value if value and schema are specified', function() {
        const value       = { a: 1, b: 1 };
        const schema      = { a: true };
        const mappedValue = mapper(value, schema);

        expect(mappedValue).to.be.deep.equal({ a: 1 });
    });
});