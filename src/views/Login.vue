<template>
  <div class="login">
    <Header />
    <p>Login page</p>
  </div>
</template>

<script>
// importation du composant Header
import Header from '../components/Header.vue'

export default {
  name: "Login",
  components: {
    Header
  }
}
</script>
