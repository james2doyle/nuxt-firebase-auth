import firebase from 'firebase'

export default function ({
  store,
  redirect
}) {
  if (!store.getters.isAuthenticated && !firebase.auth().currentUser) {
    return redirect('/account/login')
  }
}
