import firebase from 'firebase/app'

export default function ({
  isServer,
  redirect
}) {
  // the server can never be authed for a single account
  if (isServer && !firebase.apps.length) {
    redirect('/account/login')
  }
}
