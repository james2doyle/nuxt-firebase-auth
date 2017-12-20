<template>
  <button type="button" class="btn" v-on:click.prevent="GoogleButton" v-text="label"></button>
</template>

<script>
export default {
  name: 'GoogleButton',
  props: {
    label: {
      required: true
    }
  },
  methods: {
    GoogleButton () {
      this.$store.dispatch('userGoogleLogin')
    }
  }
}
</script>
