'use strict';

const utils  = require('../../lib/utils');
const expect = require('chai').expect;

describe('utils', function() {
    describe('getPropertyValue', function() {
        const object = {
            a: {
                b: {
                    c: 'c'
                }
            }
        };
        
        it('returns value at absolute path', function() {
            const path  = '$.a.b.c';
            const value = utils.getPropertyValue(object, object, path);

            expect(value).to.be.equal('c');
        });

        it('returns value at relative path', function() {
            const path  = 'b.c';
            const value = utils.getPropertyValue(object, object.a, path);

            expect(value).to.be.equal('c');
        });
        
        it('returns undefined if there is no value at path', function() {
            const path  = '$.a.b2';
            const value = utils.getPropertyValue(object, object, path);

            expect(value).to.be.undefined;
        });
    });
});