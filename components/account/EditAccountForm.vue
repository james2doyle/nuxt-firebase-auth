<template>
  <form>
    <dl class="form-group">
      <dt><label class="text-inherit">Display Name</label></dt>
      <dd class="control">
        <input class="form-control" type="email" placeholder="Display Name" v-model="newData.displayName" v-on:input="updateField('displayName')">
      </dd>
    </dl>
    <dl class="form-group">
      <dt><label class="text-inherit">Profile Image</label></dt>
      <dd class="control">
        <input class="form-control" type="file" accept="image/*" placeholder="Profile Image" v-on:change="updateProfileImage" ref="fileInput">
      </dd>
    </dl>
    <div class="form-group">
      <div class="flash" v-if="formSuccess.length > 0" v-text="formSuccess"></div>
      <div class="flash flash-error" v-if="formError.length > 0" v-text="formError"></div>
    </div>
  </form>
</template>

<script>
import firebase from 'firebase/app'
import { mapState } from 'vuex'

export default {
  computed: mapState([
    'user',
    'account'
  ]),
  data () {
    return {
      newData: {
        displayName: '',
        image: ''
      },
      debounceTimer: setTimeout(() => {}),
      formError: '',
      formSuccess: ''
    }
  },
  mounted () {
    this.newData.displayName = this.account.displayName
    this.newData.image = this.account.image
  },
  methods: {
    resetFormMessages () {
      this.formSuccess = this.formError = ''
    },
    updateField (key) {
      this.resetFormMessages()
      clearTimeout(this.debounceTimer)
      this.debounceTimer = setTimeout(() => {
        console.info('update field', key)
        this.$store.dispatch('userUpdate', this.newData)
          .then(() => {
            this.formSuccess = 'Successfully updated your account details'
          })
          .catch((err) => {
            this.formError = 'Error saving the profile changes'
            console.error(err)
          })
      }, 500)
    },
    updateProfileImage () {
      this.resetFormMessages()
      const file = this.$refs.fileInput.files[0]
      const ref = firebase.storage().ref().child(`accounts/profile/${this.user.uid}`)
      ref.put(file)
        .then((snapshot) => {
          return snapshot.ref.getDownloadURL()
        })
        .then((downloadUrl) => {
          return this.$store.dispatch('userUpdateImage', downloadUrl)
        })
        .then(() => {
          this.formSuccess = 'Successfully uploaded a new profile image'
          // reset the form input
          this.$refs.fileInput.value = null
        })
        .catch((err) => {
          this.formError = 'Error uploading new profile image'
          console.error(err)
        })
    }
  }
}
</script>
