# Nuxt Firebase Auth

> An example of using Nuxt with Firebase to auth users without a server

## Firebase Setup

Create a `firebase.js` file in the root of the project. It will look something like this:

```js
module.exports = {
  'apiKey': 'info-from-firebase-web-instructions',
  'authDomain': 'info-from-firebase-web-instructions',
  'databaseURL': 'info-from-firebase-web-instructions',
  'projectId': 'info-from-firebase-web-instructions',
  'storageBucket': 'info-from-firebase-web-instructions',
  'messagingSenderId': 'info-from-firebase-web-instructions'
}
```

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).
