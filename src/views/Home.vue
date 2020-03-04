<template>
  <div class="home">
    <Navbar></Navbar>
    <Login></Login>
  </div>
</template>

<script>
import Login from '@/components/Login'
export default {
  name: 'Home',
  components: {
    Login
  }
}
</script>
