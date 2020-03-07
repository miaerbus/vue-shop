<template>
  <div class="admin">
    <div
      ref="sidebar"
      class="page-wrapper default-theme sidebar-bg bg1 toggled"
    >
      <nav id="sidebar" class="sidebar-wrapper">
        <div class="sidebar-content">
          <!-- sidebar-brand  -->
          <div class="sidebar-item sidebar-brand">
            <a href="#">vue shop</a>
          </div>
          <!-- sidebar-header  -->
          <div class="sidebar-item sidebar-header d-flex flex-nowrap">
            <div class="user-pic">
              <img
                class="img-responsive img-rounded"
                src="/img/admin_female_avatar.svg"
                alt="User picture"
              />
            </div>
            <div class="user-info">
              <span class="user-name">
                John
                <strong>Doe</strong>
              </span>
              <span class="user-email">{{ email }}</span>
              <span class="user-status">
                <i class="fa fa-circle"></i>
                <span>Online</span>
              </span>
            </div>
          </div>
          <!-- sidebar-search  -->
          <div class="sidebar-item sidebar-search">
            <div>
              <div class="input-group">
                <input
                  type="text"
                  class="form-control search-menu"
                  placeholder="Search..."
                />
                <div class="input-group-append">
                  <span class="input-group-text">
                    <i class="fa fa-search" aria-hidden="true"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <!-- sidebar-menu  -->
          <div class=" sidebar-item sidebar-menu">
            <ul>
              <li class="header-menu">
                <span>Menu</span>
              </li>
              <li class="sidebar-dropdown">
                <router-link to="/admin/overview">
                  <i class="fa fa-chalkboard"></i>
                  <span class="menu-text">Overview</span>
                </router-link>
              </li>
              <li class="sidebar-dropdown">
                <router-link to="/admin/products">
                  <i class="fa fa-shopping-cart"></i>
                  <span class="menu-text">Products</span>
                </router-link>
              </li>
              <li class="sidebar-dropdown">
                <router-link to="/admin/orders">
                  <i class="fa fa-gem"></i>
                  <span class="menu-text">Orders</span>
                </router-link>
              </li>
              <li class="sidebar-dropdown">
                <router-link to="/admin/profile">
                  <i class="fa fa-user"></i>
                  <span class="menu-text">Profile</span>
                </router-link>
              </li>
              <li class="sidebar-dropdown">
                <a href="#" @click="signout()">
                  <i class="fa fa-sign-out-alt"></i>
                  <span class="menu-text">Logout</span>
                </a>
              </li>
            </ul>
          </div>
          <!-- sidebar-menu  -->
        </div>
      </nav>
      <!-- page-content  -->
      <main class="page-content pt-2">
        <router-view></router-view>
      </main>
      <!-- page-content" -->
    </div>
    <!-- page-wrapper -->
  </div>
</template>

<script>
import { fb } from '../firebase'

export default {
  name: 'Admin',
  data() {
    return {
      name: null,
      email: null
    }
  },

  created() {
    fb.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        this.email = user.email
        console.log(user)
      } else {
        // No user is signed in.
        console.log('No user is signed in.')
      }
    })
  },

  methods: {
    signout() {
      fb.auth()
        .signOut()
        .then(() => {
          // Sign-out successful.
          this.$router.replace('/')
        })
        .catch(function(error) {
          // An error happened.
          console.log(error)
        })
    }
  }
}
</script>
