<script setup>
import Footer from './views/components/Footer.vue'
import './css/footer.css';

</script>

<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> | <router-link to="/about">About</router-link> |
    <router-link to="/contact">Contact</router-link>
  </nav> -->
  <main>
    <router-view />
    <Footer />
  </main>
</template>

<script>



export default {

  components: {
    Footer
  }
}
</script>