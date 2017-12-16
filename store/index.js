import Vuex from 'vuex'
import firebase from 'firebase'
import { firebaseMutations, firebaseAction } from 'vuexfire'

const createStore = () => {
  return new Vuex.Store({
    state: {
      user: null,
      account: null
    },
    getters: {
      isAuthenticated (state) {
        return !!state.user
      }
    },
    actions: {
      setAccountRef: firebaseAction(({ bindFirebaseRef }, path) => {
        return bindFirebaseRef('account', firebase.database().ref(path))
      }),
      resetUser ({
        state
      }) {
        state.user = null
      },
      userCreate ({ state }, account) {
        return firebase.auth()
          .createUserWithEmailAndPassword(account.email, account.password)
          .then((user) => {
            console.log(user)
            return firebase.database().ref(`accounts/${user.uid}`).set({
              displayName: user.displayName || user.email.split('@')[0], // use part of the email as a username
              email: user.email,
              image: '/images/default-profile.png' // supply a default profile image for all users
            })
          })
      },
      userLogin ({ state }, account) {
        return firebase.auth()
          .signInWithEmailAndPassword(account.email, account.password)
          .then(() => {
          })
      },
      userLogout ({ state }) {
        return firebase.auth()
          .signOut()
          .then(() => {
            console.log('Signed Out')
            this.dispatch('resetUser')
          })
      },
      userUpdate ({ state }, newData) {
        return firebase.database().ref(`accounts/${state.user.uid}`).update({
          displayName: newData.displayName
        })
      },
      userUpdateImage ({ state }, image) {
        return firebase.database().ref(`accounts/${state.user.uid}`).update({
          image
        })
      }
    },
    mutations: {
      ...firebaseMutations,
      setUser (state, user) {
        state.user = user
        return this.dispatch('setAccountRef', `accounts/${state.user.uid}`)
      }
    }
  })
}

export default createStore
