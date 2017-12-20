<template>
  <div>
    <div class="columns" v-if="account" v-cloak>
      <div class="one-half column centered">
        <div class="blankslate blankslate-clean-background">
          <div class="profile-image centered">
            <a v-bind:href="account.image" class="d-inline-block" target="_blank" title="Click To View">
              <img v-bind:src="account.image" width="100" height="100" v-bind:alt="imageAlt" />
            </a>
          </div>
          <h3 v-text="account.displayName"></h3>
          <p>View and manage your account</p>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="one-half column centered" v-if="editing" v-cloak>
        <p>Edit Your Profile</p>
        <EditAccountForm />
      </div>
      <div class="one-half column centered" v-else>
        <div v-if="account" v-cloak>
          <p>Information pulled from the firebase <code>/account</code> dataset</p>
          <pre v-text="`${JSON.stringify(account, null, 2)}`"></pre>
        </div>
      </div>
      <div class="mt-4 one-half column centered">
        <button type="button" class="btn btn-primary mr-2" v-on:click="toggleEditForm">
          <span v-if="editing">Done</span>
          <span v-else>Edit</span>
        </button>
        <button type="button" class="btn btn-danger" v-on:click="signOut">Sign Out</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import EditAccountForm from '~/components/account/EditAccountForm.vue'

export default {
  // middleware: 'authenticated', // checking if auth'd with firebase kinda sucks as the middleware is triggered before firebase is ready
  components: {
    EditAccountForm
  },
  computed: {
    ...mapState([
      'user',
      'account'
    ]),
    imageAlt () {
      return `Profile image for ${this.account.displayName}`
    }
  },
  data () {
    return {
      editing: false
    }
  },
  methods: {
    toggleEditForm () {
      this.editing = !this.editing
    },
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

<style lang="css" scoped>
  .profile-image img {
    border-radius: 100px;
    overflow: hidden;
    border: 2px solid #b2b1b0;
  }
  pre {
    white-space: pre-wrap;
  }
</style>
