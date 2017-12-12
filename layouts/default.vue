<template>
  <div class="container">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="flex-table">
        <div class="flex-table-item flex-table-item-primary">
          <nuxt-link class="navbar-item" to="/"><strong>Home</strong></nuxt-link>
        </div>
        <div class="flex-table-item text-right" v-cloak>
          <nuxt-link v-if="user" class="navbar-item" to="/account" v-text="user.email"></nuxt-link>
          <nuxt-link v-else class="navbar-item" to="/account/login">Login</nuxt-link>
        </div>
      </div>
    </nav>
    <nuxt/>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState([
    'user'
  ])
}
</script>

<style lang="css">
.flex-table {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.flex-table-item {
  flex: 1;
}
.flex-table-item-primary {
  flex: 3;
}
</style>
