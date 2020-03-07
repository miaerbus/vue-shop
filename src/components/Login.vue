<template>
  <div
    class="modal fade"
    id="modal"
    ref="modal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <ul
            class="nav nav-pills justify-content-center mb-3"
            id="pills-tab"
            role="tablist"
          >
            <li class="nav-item">
              <a
                class="nav-link active"
                id="pills-signup-tab"
                data-toggle="pill"
                href="#pills-signup"
                role="tab"
                aria-controls="pills-signup"
                aria-selected="true"
              >
                Signup
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                id="pills-login-tab"
                data-toggle="pill"
                href="#pills-login"
                role="tab"
                aria-controls="pills-login"
                aria-selected="false"
              >
                Login
              </a>
            </li>
          </ul>
          <div class="tab-content" id="pills-tabContent">
            <div
              class="tab-pane fade show active"
              id="pills-signup"
              role="tabpanel"
              aria-labelledby="pills-signup-tab"
            >
              <h3>Create new account</h3>
              <div class="form-group">
                <label for="exampleInputName1">Your name</label>
                <input
                  v-model="name"
                  type="text"
                  class="form-control"
                  id="exampleInputName1"
                  placeholder="Your name"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input
                  v-model="email"
                  type="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Email"
                />
                <small id="emailHelp" class="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input
                  v-model="password"
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                />
              </div>
              <button class="btn btn-primary" @click="signup()">
                Signup
              </button>
            </div>
            <div
              class="tab-pane fade"
              id="pills-login"
              role="tabpanel"
              aria-labelledby="pills-login-tab"
            >
              <h3>Login</h3>
              <div class="form-group">
                <label for="exampleInputEmail2">Email address</label>
                <input
                  v-model="email"
                  type="email"
                  class="form-control"
                  id="exampleInputEmail"
                  placeholder="Enter email"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputPassword2">Password</label>
                <input
                  v-model="password"
                  type="password"
                  class="form-control"
                  id="exampleInputPassword2"
                  placeholder="Password"
                  @keyup.enter="login()"
                />
              </div>
              <button class="btn btn-primary" @click="login()">Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db, fb } from '../firebase'

export default {
  name: 'Login',
  data() {
    return {
      name: null,
      email: null,
      password: null
    }
  },

  methods: {
    signup() {
      fb.auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(user => {
          // Add a new document in collection "cities"
          db.collection('users')
            .doc(user.user.uid)
            .set({
              name: this.name
            })
            .then(() => {
              console.log('Document successfully written!')
            })
            .catch(error => {
              console.error('Error writing document: ', error)
            })
          this.$router.replace('admin')
        })
        .catch(error => {
          // Handle Errors here.
          //   var errorCode = error.code
          //   var errorMessage = error.message
          // ...
          console.log(error)
        })
    },

    login() {
      fb.auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.replace('admin')
        })
        .catch(function(error) {
          // Handle Errors here.
          // var errorCode = error.code
          // var errorMessage = error.message
          // ...
          console.log(error)
        })
    }
  }
}
</script>

<style></style>
