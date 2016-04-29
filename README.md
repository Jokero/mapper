# mapper

Objects mapping using specified schema

[![NPM version](https://img.shields.io/npm/v/mymapper.svg)](https://npmjs.org/package/mymapper)
[![Build status](https://img.shields.io/travis/Jokero/mymapper.svg)](https://travis-ci.org/Jokero/mymapper)

**Note:** This module will only work with Node.js >= 4.0.

## Installation

```sh
npm install mapper
```

## Usage

There are two ways to use module:

### 1. mapper(value, schema): Object | Object[]

**Parameters**

* `value` {Object | Object[]} - Object or array of objects to map
* `schema` {Object} - Schema which define how to map object

**Return value**

Result of mapping (object or array of objects)

```js
const mapper = require('mapper');

const object = { /* ... */ };
const schema = { /* ... */ };

const result = mapper(object, schema);
```

### 2. mapper(schema): Function

**Parameters**

* `schema` {Object} - Schema which define how to map object

**Return value**

Mapping function which can be called with `value` further

```js
const mapper = require('mapper');

const schema = { /* ... */ };
const map    = mapper(schema);

const object = { /* ... */ };

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
        facebook: 'https://www.facebook.com/peter.parker',
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

We want to send users data to clients in a different form:

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

If we want to do this we should define schema:

```js
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
        //   - current value of property
        //   - current object
        //   - original object
        //   - path as array
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
```

## Tests

```sh
npm install
npm test
```

## License

[MIT](LICENSE)