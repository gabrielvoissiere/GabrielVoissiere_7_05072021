<template>
  <div class="home">
    <Header />
    <p>Bienvenue {{ userName }} !</p>
  </div>
</template>

<script>
  // importation du composant Header
  import Header from '../components/Header.vue'

  export default {
    name: 'Home',
    data() {
      return {
        userName: sessionStorage.getItem("data")
      }
    },
    components: {
      Header
    },
    methods: {
      getUserData() {
        let data 
        console.log(data);
      }
    }

  }
</script>