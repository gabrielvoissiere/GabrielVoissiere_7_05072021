<template>
  <div class="home">
    <Header />

    <h1>Bienvenue {{ message.name }} !</h1>
    <h4 v-if="role == 'classic'">Compte administrateur</h4>
    <p>{{ fullDate }}</p>
    <button @click="delUser()">Supprimer mon profil</button>

    <div id="forum">
      <div id="forumText">
        <div id="messagesBox">
          <ul id="message">
            <li v-for="item in textInfo" :key="item" :id="item.id">
              <h4>{{ item.name }}</h4>
              <h5>{{ item.date }}</h5>
              <p>{{ item.message }}</p>
              <button class="delBtn" v-if="role == 'classic'" @click="delMsg">Supprimer</button>
            </li>
          </ul>
        </div>
        <div class="input">
          <input type="text" placeholder="Ecrivez votre message ici" v-model="message.msg">
          <div class="send" @click="postMsg()">
            <img src="../assets/send.svg" alt="send arrow">
          </div>
        </div>
      </div>

      <div id="forumMedia">
        <div id="mediaBox">
          <div v-for="item in mediaInfo" :key="item" :id="item.id" class="media">
            <p>{{ item.lastname }}</p>
            <img class="image" :src="require(`@/assets/images/${item.url}`)">
            <button class="delBtn" v-if="role == 'classic'" @click="delMedia">Supprimer</button>
          </div>
        </div>
        <div class="input">
          <input type="file" @change="postMedia" name="uploaded_file" placeholder="Ecrivez votre message ici"
            id="files">
          <button type="submit" class="send" @click="onUpload()">
            <img src="../assets/send.svg" alt="send arrow">
          </button>
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
          name: sessionStorage.getItem("lastname"),
          msg: "",
          date: ""
        },
        textInfo: [],
        media: null,
        mediaInfo: [],
        role: sessionStorage.getItem("role")
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

        const config = {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
          }
        }

        axios
          .post("http://localhost:3000/api/msg", this.message, config)
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
        const config = {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
          }
        }

        axios
          .get("http://localhost:3000/api/msg", config)
          .then((response) => {
            if (response.statusText == "OK") {
              // console.log("ok");
            }
            this.textInfo = []
            let msgArray = response.data
            msgArray.forEach(elm => {
              this.textInfo.push(elm)
            });
            let elm = document.getElementById('message');
            elm.scrollTop = elm.scrollHeight;
          })
      },

      postMedia(event) {
        this.media = event.target.files[0]
      },

      onUpload() {
        const config = {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
          }
        }

        const fd = new FormData()
        fd.append('image', this.media, this.media.name)
        fd.append('lastname', sessionStorage.getItem("lastname"))

        axios
          .post("http://localhost:3000/api/msg/media", fd, config)
          .then(res => {
            console.log(res);
            this.getMedia()
          })
          .catch((error) => {
            console.log(error.response);
          });
      },

      getMedia() {
        const config = {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
          }
        }

        axios
          .get("http://localhost:3000/api/msg/media", config)
          .then((response) => {
            if (response.statusText == "OK") {
              // console.log("ok");
            }
            this.mediaInfo = []
            response.data.forEach(elm => {
              this.mediaInfo.push({
                url: elm.imageUrl,
                lastname: elm.lastname,
                id: elm.id
              })
            });
          })
      },

      delUser() {
        const config = {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
          }
        }
        let user = {
          email: sessionStorage.getItem('email')
        }
        axios
          .post("http://localhost:3000/api/user/delete", user, config)
          .then(response => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error.response);
          });
        setTimeout(() => {
          this.$router.replace({
            name: 'Login'
          })
        }, 1000);
      },

      delMsg(event) {
        let msgId = {
          id: event.path[1].attributes.id.nodeValue
        };

        const config = {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
          },
        }

        axios
          .post("http://localhost:3000/api/msg/delete", msgId, config)
          .then(response => {
            console.log(response);
            this.getMsg()
          })
          .catch((error) => {
            console.log(error.response);
          });
      },

      delMedia(event) {
        let mediaId = {
          id: event.path[1].attributes.id.nodeValue
        };

        const config = {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
          },
        }

        axios
          .post("http://localhost:3000/api/msg/deleteMedia", mediaId, config)
          .then(response => {
            console.log(response);
            this.getMedia()
          })
          .catch((error) => {
            console.log(error.response);
          });
      }
    }
  }
</script>

<style lang="scss">
  ::-webkit-scrollbar {
    display: none;
  }

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

      .image {
        width: 90%;
        height: auto;
        object-fit: contain;
      }

      #mediaBox {
        width: 100%;
        height: 90%;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: scroll;
      }
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

      form {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
      }

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