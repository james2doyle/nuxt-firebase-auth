<template>
  <form>
    <div class="form-group">
      <label class="label">Display Name</label>
      <div class="control">
        <input class="form-control" type="email" placeholder="Display Name" v-model="newData.displayName" v-on:input="updateField('displayName')">
      </div>
    </div>
    <div class="form-group">
      <label class="label">Profile Image</label>
      <div class="control">
        <input class="form-control" type="file" accept="image/*" placeholder="Profile Image" v-on:change="updateProfileImage" ref="fileInput">
      </div>
    </div>
    <div class="form-group">
      <div class="flash" v-if="formSuccess.length > 0" v-text="formSuccess"></div>
      <div class="flash flash-error" v-if="formError.length > 0" v-text="formError"></div>
    </div>
  </form>
</template>

<script>
import { mapState } from 'vuex'
import firebase from 'firebase'

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
    updateField (key) {
      this.formSuccess = ''
      clearTimeout(this.debounceTimer)
      this.debounceTimer = setTimeout(() => {
        console.info('update field', key)
        this.$store.dispatch('userUpdate', this.newData)
          .then(() => {
            this.formSuccess = 'Successfully updated your account details'
          })
      }, 500)
    },
    updateProfileImage () {
      const file = this.$refs.fileInput.files[0]
      const ref = firebase.storage().ref(`accounts/profile/${this.user.uid}`)
      ref.put(file).then((snapshot) => {
        return this.$store.dispatch('userUpdateImage', snapshot.downloadURL)
      })
        .then(() => {
          this.formSuccess = 'Successfully uploaded a new profile image'
          // reset the form input
          this.$refs.fileInput.value = null
        })
    }
  }
}
</script>
