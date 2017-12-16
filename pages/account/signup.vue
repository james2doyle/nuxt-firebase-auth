<template>
  <div>
    <div class="columns">
      <div class="one-half column centered">
        <div class="hero">
          <div class="hero-body">
            <h1 class="title">nuxt firebase auth</h1>
            <h2 class="subtitle">Sign up for nuxt firebase auth to start using the API</h2>
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="one-half column centered">
        <div class="four-fifths">
          <SignupForm />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SignupForm from '~/components/account/SignupForm.vue'
import { mapState } from 'vuex'

export default {
  middleware: 'anonymous',
  components: {
    SignupForm
  },
  watch: {
    // firebase is sometimes slow so we need to account for
    // the user getting authenticated late in the game...
    user (to, from) {
      this.$router.push('/account')
    }
  },
  computed: mapState([
    'user'
  ])
}
</script>
