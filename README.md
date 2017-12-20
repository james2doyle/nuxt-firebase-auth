# Nuxt Firebase Auth

> An example of using Nuxt with Firebase to auth users without a server

The goal of this project is to make it really easy to generate an application that has Firebase (authentication + user account management) setup out-of-the-box.

_My personal goal with the project is to allow me to create some simple PAAS apps without having to setup auth + Firebase every time._

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

#### Rules

In order to keep other users from writing to paths they don't own, we need to add some rules to the database:

```json
{
  "rules": {
    "accounts": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    }
  }
}
```

#### Social Logins

I have setup social login for Google and Github. You will need to login to your Firebase console and enable those signin methods. Google will work out-of-the-box with any Firebase app. But you will need to create a new oAuth application if you would like to use Github signin.

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

### Demo GIF

![nuxt firebase auth preview image](/preview.gif)
