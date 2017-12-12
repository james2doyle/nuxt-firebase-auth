<template>
  <div>
    <div class="columns" v-if="user" v-cloak>
      <div class="one-half column centered">
        <div class="blankslate blankslate-clean-background">
          <h3 v-text="user.email"></h3>
          <p>View and manage your account</p>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="one-half column centered">
        <div v-if="user" v-cloak>
          <pre v-text="`${JSON.stringify(user, null, 2)}`"></pre>
        </div>
      </div>
      <div class="mt-4 one-half column centered">
        <button type="button" class="btn btn-danger" v-on:click="signOut">Sign Out</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  middleware: 'authenticated',
  computed: mapState([
    'user'
  ]),
  methods: {
    signOut () {
      this.$store.dispatch('userLogout')
        .then(() => {
          this.$router.push('/account/login')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
