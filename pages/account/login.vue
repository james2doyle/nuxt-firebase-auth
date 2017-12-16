<template>
  <div>
    <div class="columns">
      <div class="one-half column centered">
        <div class="hero">
          <div class="hero-body">
            <h1 class="title">nuxt firebase auth</h1>
            <h2 class="subtitle">Login to nuxt firebase auth to manage your account</h2>
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="one-half column centered">
        <div class="four-fifths">
          <LoginForm />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from '~/components/account/LoginForm.vue'
import { mapState } from 'vuex'

export default {
  middleware: 'anonymous',
  components: {
    LoginForm
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
