import firebase from 'firebase'

export default function ({
  isServer,
  store,
  redirect
}) {
  if (!isServer && (store.getters.isAuthenticated && firebase.auth().currentUser)) {
    return redirect('/account')
  }
}
