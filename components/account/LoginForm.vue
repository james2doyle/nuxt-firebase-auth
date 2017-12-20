<template>
  <div>
    <form v-on:submit.prevent="signup">
      <div class="form-group">
        <label>Email</label>
        <div class="control">
          <input class="form-control" v-bind:class="{ 'is-danger': invalidEmail }" type="email" placeholder="Account Email" v-model="email">
        </div>
        <p class="error" v-if="invalidEmail">This email is invalid</p>
      </div>

      <div class="form-group">
        <label>Password</label>
        <div class="control">
          <input class="form-control" v-bind:class="{ 'is-danger': invalidPassword }" type="password" placeholder="Password" v-model="password">
        </div>
        <p class="error" v-if="invalidPassword">This password is invalid</p>
      </div>

      <div class="form-group">
        <p><nuxt-link to="/account/signup">I don't have an account</nuxt-link></p>
      </div>

      <div class="form-group">
        <div class="flash flash-error" v-if="formError.length > 0" v-text="formError"></div>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn btn-primary">Log In</button>
      </div>

      <div class="form-actions mt-2">
        <GoogleButton label="Sign In With Google" />
      </div>

      <div class="form-actions mt-2">
        <GithubButton label="Sign In With Github" />
      </div>
    </form>
  </div>
</template>

<script>
import GoogleButton from '~/components/account/3rd-party/GoogleButton.vue'
import GithubButton from '~/components/account/3rd-party/GithubButton.vue'

export default {
  name: 'LoginForm',
  components: {
    GoogleButton,
    GithubButton
  },
  data () {
    return {
      email: '',
      password: '',
      formError: ''
    }
  },
  computed: {
    invalidEmail () {
      return false // !this.email.includes('@')
    },
    invalidPassword () {
      return false // !this.password.length > 12
    }
  },
  methods: {
    signup () {
      this.formError = ''
      this.$store.dispatch('userLogin', {
        email: this.email,
        password: this.password
      })
        .then(() => {
          this.$router.push('/account')
        })
        .catch((error) => {
          console.log(error)
          this.formError = error.message
        })
    }
  }
}
</script>
