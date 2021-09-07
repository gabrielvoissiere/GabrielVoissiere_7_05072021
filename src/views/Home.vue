<template>
  <div class="home">
    <Header />

    <h1>Bienvenue {{ message.name }} !</h1>
    <p>{{ fullDate }}</p>

    <div id="forum">
      <div id="forumText">

        <div id="messagesBox">
        </div>

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

    <p @click="getMsg()">reload</p>
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
          name: sessionStorage.getItem("lastname"),
          msg: "",
          date: ""
        },
        textForum: {}
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
        let date = new Date()
        let day = date.getDate()
        let month = date.getMonth()
        let year = date.getFullYear()
        let fullDate = day + "/" + month + "/" + year
        this.message.date = fullDate

        axios
          .post("http://localhost:3000/api/msg", this.message)
          .then((response) => {
            if (response.statusText == "OK") {
              console.log("ok");
            }
            this.message.msg = ""
            this.getMsg()
          })
          .catch((error) => {
            console.log(error.response);
          });
      },

      getMsg() {
        axios
          .get("http://localhost:3000/api/msg")
          .then((response) => {
            if (response.statusText == "OK") {
              console.log("ok");
            }
            let box = document.getElementById("messagesBox")
            if (box.innerHTML == "") {
              let liste = document.createElement("ul")
              liste.setAttribute("id", "message")
              box.appendChild(liste)

              let msgArray = response.data
              msgArray.forEach(elm => {
                let forum = document.getElementById("message")

                let msgBox = document.createElement("li")

                let nameArea = document.createElement("h4")
                nameArea.innerHTML = elm.name

                let msgArea = document.createElement("p")
                msgArea.innerHTML = elm.message

                let dateArea = document.createElement("h5")
                dateArea.innerHTML = elm.date

                msgBox.appendChild(nameArea)
                msgBox.appendChild(dateArea)
                msgBox.appendChild(msgArea)

                forum.appendChild(msgBox)
              });
              let elm = document.getElementById('message');
              elm.scrollTop = elm.scrollHeight;
                 
            } else {
              box.removeChild(box.childNodes[0])
              let liste = document.createElement("ul")
              liste.setAttribute("id", "message")
              box.appendChild(liste)

              let msgArray = response.data
              msgArray.forEach(elm => {
                let forum = document.getElementById("message")

                let msgBox = document.createElement("li")

                let nameArea = document.createElement("h4")
                nameArea.innerHTML = elm.name

                let msgArea = document.createElement("p")
                msgArea.innerHTML = elm.message

                let dateArea = document.createElement("h5")
                dateArea.innerHTML = elm.date

                msgBox.appendChild(nameArea)
                msgBox.appendChild(dateArea)
                msgBox.appendChild(msgArea)

                forum.appendChild(msgBox)
              });
              let elm = document.getElementById('message');
              elm.scrollTop = elm.scrollHeight;
            }


          })
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

      #messagesBox {
        height: 90%;


        #message {
          height: 100%;
          overflow: scroll;

          li {
            padding: 15px 0px 15px 0px;
            border-bottom: 1px solid #000;
            list-style-type: none;
          }
        }
      }
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