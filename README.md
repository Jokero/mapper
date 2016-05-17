# mapper.js

Transform object from one structure to another by using schema. It's useful in API when you want to modify data before sending it to clients

[![NPM version](https://img.shields.io/npm/v/mapper.js.svg)](https://npmjs.org/package/mapper.js)
[![Build status](https://img.shields.io/travis/Jokero/mapper.js.svg)](https://travis-ci.org/Jokero/mapper.js)

**Note:** This module will only work with Node.js >= 4.0.

## Installation

```sh
npm install mapper.js
```

## Usage

You can use mapper.js by `require('mapper.js')` in node.js or in browser with require.js. Also we can get it in browser as `window.mapper`.

There are two ways to use module:

### 1. mapper(data, schema)

**Parameters**

* `data` (Object | Object[]) - Object or array of objects to map
* `schema` (Object) - Schema which define how to map object

**Return value**

(Object | Object[]) - Result of mapping (object or array of objects)

```js
const mapper = require('mapper.js');

const result = mapper(object, schema);
```

### 2. mapper(schema)

**Parameters**

* `schema` (Object) - Schema which define how to map object

**Return value**

(Function): Mapping function which can be called with `data` further

```js
const mapper = require('mapper.js');
const map    = mapper(schema);

const result = map(object);
```

### Example

Imagine we have collection of users and each user object has the following structure:

```js
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
```

We want to send users data to clients in a different format:

```js
{
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
}
```

We can do it by using the schema:

```js
const mapper = require('mapper.js');

const userSchema = {
    // take field without any changes
    id: true, // or '=',

    // you can specify function and return custom value
    fullName: function(fullName, user) {
        return user.firstName + ' ' + user.lastName;
    },

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
        facebook: function(facebook, contacts, user, path) {
            return user.socialNetworks.facebook;
        },

        vk: '$.socialNetworks.vk'
    },

    // for arrays use array with schema for item
    friends: [{
        id: true,
        fullName: function(fullName, friend) {
            return friend.firstName + ' ' + friend.lastName;
        }
    }]
};

const result = mapper(user, userSchema); // or mapper(userSchema)(user)
```

## Build

```sh
npm install
npm run build
```

## Tests

```sh
npm install
npm test
```

## License

[MIT](LICENSE)