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

    describe('resolves a schema when it is defined as a function', function() {
        it('when value is an array of objects', function() {
            const data = [
                { a: 10, b: 20, c: 30 },
                { a: 40, b: 50, c: 60 }
            ];
            const schema = ({ b }) => ({
                a: true,
                b: () => b
            });
            const mappedData = map(data, schema);

            expect(mappedData).to.deep.equal([
                { a: 10, b: 20 },
                { a: 40, b: 50 }
            ]);
        });

        it('when value is an object', function() {
            const data = { a: 10, b: 20, c: 30 };
            const schema = ({ b }) => ({
                a: true,
                b: () => b
            });
            const mappedData = map(data, schema);

            expect(mappedData).to.deep.equal({ a: 10, b: 20 });
        });
    });
});