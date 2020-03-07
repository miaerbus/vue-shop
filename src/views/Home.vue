<template>
  <div class="home">
    <Navbar></Navbar>
    <Login></Login>
    <ProductList></ProductList>
    <MiniCart></MiniCart>
  </div>
</template>

<script>
import Login from '@/components/Login'
import MiniCart from '@/components/MiniCart'
import ProductList from '@/sections/ProductList'

export default {
  name: 'Home',
  components: {
    Login,
    ProductList,
    MiniCart
  }
}
</script>
