<template>
  <button type="button" class="btn" v-on:click.prevent="GithubButton" v-text="label"></button>
</template>

<script>
export default {
  name: 'GithubButton',
  props: {
    label: {
      required: true
    }
  },
  methods: {
    GithubButton () {
      this.$store.dispatch('userGithubLogin')
    }
  }
}
</script>
