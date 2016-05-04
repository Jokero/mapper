'use strict';

const mapper = require('..');
const expect = require('chai').expect;

describe('mapper', function() {
    it('returns function if only schema is specified', function() {
        const schema      = { a: true };
        const mapFunction = mapper(schema);

        const data       = { a: 1, b: 1 };
        const mappedData = mapFunction(data);

        expect(mappedData).to.be.deep.equal({ a: 1 });

    });

    it('returns mapped value if value and schema are specified', function() {
        const data       = { a: 1, b: 1 };
        const schema     = { a: true };
        const mappedData = mapper(data, schema);

        expect(mappedData).to.be.deep.equal({ a: 1 });
    });

    it('works with example from readme', function() {
        const user = {
            id: 12345,

            firstName: 'Peter',
            lastName: 'Parker',

            company: {
                name: 'Daily Bugle',
                position: 'Photographer'
            },

            email: 'peter.parker@marvel.com',

            socialNetworks: {
                vk: 'https://vk.com/peter.parker',
                facebook: 'https://www.facebook.com/peter.parker'
            },

            friends: [
                {
                    id: 12346,
                    firstName: 'Mary Jane',
                    lastName: 'Watson'
                },
                {
                    id: 12347,
                    firstName: 'Harold',
                    lastName: 'Osborn'
                }
            ]
        };

        const userSchema = {
            id: true,

            fullName: function(fullName, user) {
                return user.firstName + ' ' + user.lastName;
            },

            companyName: 'company.name',

            contacts: {
                email: '$.email',

                facebook: function(facebook, contacts, user, path) {
                    return user.socialNetworks.facebook;
                },

                vk: '$.socialNetworks.vk'
            },

            friends: [{
                id: true,
                fullName: function(fullName, friend) {
                    return friend.firstName + ' ' + friend.lastName;
                }
            }]
        };

        const mappedUser = mapper(user, userSchema); // or mapper(userSchema)(user)

        expect(mappedUser).to.deep.equal({
            id: 12345,
            fullName: 'Peter Parker',
            companyName: 'Daily Bugle',

            contacts: {
                email: 'peter.parker@marvel.com',
                vk: 'https://vk.com/peter.parker',
                facebook: 'https://www.facebook.com/peter.parker'
            },

            friends: [
                { id: 12346, fullName: 'Mary Jane Watson' },
                { id: 12347, fullName: 'Harold Osborn' }
            ]
        });
    });
});