<template>
  <div>
    <form v-on:submit.prevent="signup">
      <div class="form-group">
        <label class="label">Email</label>
        <div class="control">
          <input class="form-control" v-bind:class="{ 'is-danger': invalidEmail }" type="email" placeholder="Account Email" value="hello@" v-model="email">
        </div>
        <p class="error" v-if="invalidEmail">This email is invalid</p>
      </div>

      <div class="form-group">
        <label class="label">Password</label>
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
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
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
