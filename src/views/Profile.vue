<template>
  <div class="profile">
    <div class="container">
      <h3>Profile</h3>
      <p>Change your profile settings here</p>
      <form @submit.prevent>
        <div class="form-group">
          <label for="inputName">Name</label>
          <input
            v-model="profile.name"
            type="text"
            class="form-control"
            id="inputName"
          />
        </div>
        <div class="form-group">
          <label for="inputAddress">Address</label>
          <input
            v-model="profile.address"
            type="text"
            class="form-control"
            id="inputAddress"
            placeholder="1234 Main St"
          />
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputCity">City</label>
            <input
              v-model="profile.city"
              type="text"
              class="form-control"
              id="inputCity"
            />
          </div>
          <div class="form-group col-md-6">
            <label for="inputZip">Zip</label>
            <input
              v-model="profile.zip"
              type="text"
              class="form-control"
              id="inputZip"
            />
          </div>
        </div>
        <button class="btn btn-primary" @click="updateProfile()">
          Update
        </button>
      </form>
      <hr />
      <form @submit.prevent>
        <div class="form-group">
          <label for="inputEmail">Email</label>
          <input
            v-model="account.email"
            type="text"
            class="form-control"
            id="inputEmail"
          />
        </div>
        <div class="form-group">
          <label for="inputPassword">Password</label>
          <input
            v-model="account.password"
            type="password"
            class="form-control"
            id="inputPassword"
          />
        </div>
        <div class="form-group">
          <label for="inputPasswordRepeat">Repeat Password</label>
          <input
            type="password"
            class="form-control"
            id="inputPasswordRepeat"
          />
        </div>
        <button class="btn btn-primary" @click="updateAccount">
          Update
        </button>
        <button class="btn btn-success" @click="resetPassword">
          Reset password by email
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { fb, db } from '../firebase'

export default {
  name: 'Profile',
  data() {
    return {
      profile: {
        name: null,
        address: null,
        city: null,
        zip: null
      },
      account: {
        name: null,
        email: null,
        photoUrl: null,
        emailVerified: null,
        password: null,
        confirmPassword: null,
        uid: null
      }
    }
  },

  firestore() {
    const user = fb.auth().currentUser
    return {
      profile: db.collection('users').doc(user.uid)
    }
  },

  methods: {
    updateProfile() {
      this.$firestore.profile.update(this.profile)
    },
    updateAccount() {},

    resetPassword() {
      const auth = fb.auth()
      auth
        .sendPasswordResetEmail(auth.currentUser.email)
        .then(() => {
          // Email sent.
          console.log('Email sent!')
        })
        .catch(() => {
          // An error happened.
        })
    }
  }
}
</script>

<style></style>
