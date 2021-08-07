<template>
  <div id="login">
    <!-- ajout du composant Header -->
    <Header />

    <div id="global">
      <!-- logo de l'entreprise -->
      <img src="../assets/logo.svg" alt="">

      <!-- Boite de connexion -->
      <div id="login-box">
        <!-- nom -->
        <div class="login-block">
          <label for="name">Email</label>
          <input type="text" placeholder="j.dupont@gmail.com" v-model="user.email">
        </div>

        <!-- mot de passe -->
        <div class="login-block">
          <!-- option pour afficher/masquer le mot de passe -->
          <label for="massword">Mot de passe <i @click="seen()" class="far fa-eye"></i></label>
          <input :type="type" placeholder="******" v-model="user.password">
        </div>

        <button class="connection" @click="login()">Se Connecter</button>

        <router-link id="signup" to="/signup">Pas de compte ? Inscrivez vous !</router-link>

      </div>
    </div>

    <p id="copyright">copyright - Groupomania 2021</p>
  </div>
</template>

<script>
  // importation du composant Header
  import Header from '../components/Header.vue'
  const axios = require('axios');

  export default {
    name: "Login",
    components: {
      Header
    },
    data() {
      return {
        show: false,
        type: "password",
        user: {
          email: "",
          password: ""
        }
      }
    },
    methods: {
      seen() {
        if (this.show == false) {
          this.show = true
          this.type = "text"
        } else if (this.show == true) {
          this.show = false
          this.type = "password"
        }
      },
      login() {
        axios
          .post("http://localhost:3000/api/user/login", this.user)
          .then((response) => {
            if (response.statusText == "OK") {
              this.$router.push({
                name: "Home"
              })
            }
          })
          .catch((error) => {
            console.log(error.response);
          });
      }
    }
  }
</script>

<style lang="scss">
  #login {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    #global {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 20vh;

      img {
        margin-right: 4vh;
      }

      #login-box {
        background-color: #ffffff;
        width: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 8vh;
        border-radius: 20px;
        box-shadow: 0px 0px 10px #b3b1b1;
        margin-left: 4vh;

        label {
          margin-bottom: 0.5vh;
        }

        i {
          font-size: 1rem;
        }

        input {
          border: none;
          background-color: transparent;
          border-bottom: 1px solid #000;
        }

        button {
          border: none;
          background-color: black;
          padding: 15px;
          border-radius: 20px;
          color: white;
        }

        .login-block {
          display: flex;
          flex-direction: column;
          margin-bottom: 2vh;
          width: 100%;
        }

        .connection {
          margin-top: 2vh;
        }

        #signup {
          font-size: 0.75rem;
          margin-top: 2vh;
          color: black;
          text-decoration: none;
        }
      }
    }

    #copyright {
      position: absolute;
      bottom: 2vh;
    }
  }
</style>