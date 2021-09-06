<template>
  <div class="home">
    <Header />

    <h1>Bienvenue !</h1>
    <p>{{ fullDate }}</p>

    <div id="forum">
      <div id="forumText">
        <div class="input">
          <input type="text" placeholder="Ecrivez votre message ici" v-model="message.msg">
          <div class="send" @click="postMsg()">
            <img src="../assets/send.svg" alt="send arrow">
          </div>
        </div>
      </div>
      <div id="forumMedia">
        <div class="input">
          <input type="text" placeholder="Ecrivez votre message ici">
          <div class="send">
            <img src="../assets/send.svg" alt="send arrow">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // importation du composant Header
  import Header from '../components/Header.vue'

  const axios = require('axios');

  export default {
    name: 'Home',
    data() {
      return {
        date: "",
        message: {
          name: "Bertrand",
          msg: ""
        }
      }
    },
    components: {
      Header
    },
    computed: {
      fullDate() {
        let getdate = new Date()
        let day = getdate.getDate()
        let month = getdate.getMonth()
        let year = getdate.getFullYear()

        let showFullDate = day + "/" + month + "/" + year
        return `nous somme le ${showFullDate}`
      }
    },
    methods: {
      postMsg() {
        axios
          .post("http://localhost:3000/api/msg", this.message)
          .then((response) => {
            if (response.statusText == "OK") {
              console.log("ok");
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
  #forum {
    display: flex;
    justify-content: space-around;
    margin-top: 5vh;

    #forumText {
      position: relative;
      width: 40vw;
      height: 60vh;
      box-shadow: 0px 0px 10px #b3b1b1;
      border-radius: 15px;
    }

    #forumMedia {
      position: relative;
      width: 40vw;
      height: 60vh;
      box-shadow: 0px 0px 10px #b3b1b1;
      border-radius: 15px;
    }

    .input {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100%;
      height: 5vh;
      position: absolute;
      bottom: 0px;
      background-color: black;
      border-radius: 0px 0px 15px 15px;

      .send {
        width: 10%;
        height: 90%;
        background-color: black;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          height: 60%;
          width: auto;
        }
      }

      input {
        width: 85%;
        height: 60%;
        outline: none;
        border: 1px solid black;
        border-radius: 10px;
        padding: 5px;
      }


    }
  }
</style>