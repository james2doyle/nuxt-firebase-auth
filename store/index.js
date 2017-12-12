import Vuex from 'vuex'
import firebase from 'firebase'
import { firebaseMutations } from 'vuexfire'

const createStore = () => {
  return new Vuex.Store({
    state: {
      user: null
    },
    getters: {
      isAuthenticated (state) {
        return !!state.user
      }
    },
    actions: {
      resetUser ({
        state
      }) {
        state.user = null
      },
      userCreate ({ state }, account) {
        return firebase.auth()
          .createUserWithEmailAndPassword(account.email, account.password)
      },
      userLogin ({ state }, account) {
        return firebase.auth()
          .signInWithEmailAndPassword(account.email, account.password)
      },
      userLogout (state) {
        return firebase.auth()
          .signOut()
          .then(() => {
            console.log('Signed Out')
            this.dispatch('resetUser')
          })
      }
    },
    mutations: {
      ...firebaseMutations,
      setUser (state, user) {
        state.user = user
      }
    }
  })
}

export default createStore
