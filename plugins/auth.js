import firebaseConfig from '~/firebase'
import firebase from 'firebase'

export default function ({
  store,
  redirect
}) {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  }

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      store.commit('setUser', user)
    }
  })
}
