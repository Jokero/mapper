const mapper = require('mapper.js');

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
    // take field without any changes
    id: true, // or '=',

    // you can specify function and return custom value
    fullName: (fullName, user) => user.firstName + ' ' + user.lastName,

    // take "name" field from "company" object
    companyName: 'company.name', // or '=company.name'

    // you can work with embedded objects
    contacts: {
        // by default property path is relative to current object,
        // so if you want to get value from top-level object ("user" in example) use "$"
        email: '$.email', // or '=$.email'

        // function takes 4 arguments:
        //   - current value of property = user.contacts.facebook
        //   - current object            = user.contacts
        //   - original object           = user
        //   - path as array             = ['contacts', 'facebook']
        facebook: (facebook, contacts, user, path) => user.socialNetworks.facebook,

        vk: '$.socialNetworks.vk'
    },

    // for arrays use array with schema for item
    friends: [{
        id: true,
        fullName: (fullName, friend) => friend.firstName + ' ' + friend.lastName
    }]
};

const mappedUser = mapper(user, userSchema); // or mapper(userSchema)(user)
console.log(mappedUser);