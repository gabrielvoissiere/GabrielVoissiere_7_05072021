<template>
  <div class="home">
    <Header />

    <div id="header">
      <div id="haut">
        <h1>Bienvenue {{ message.name }} !</h1>
        <h4 v-if="role == 'admin'">Compte administrateur</h4>
        <p>{{ fullDate }}</p>
      </div>
      <div id="btn">
        <button @click="getMsg(), getMedia()">Recharger les messages</button>
        <button @click="delUser()" class="delBtn">Supprimer mon profil</button>
      </div>
    </div>

    <div id="forum">
      <div id="forumText">
        <div id="messagesBox">
          <ul id="message">
            <li v-for="item in textInfo" :key="item" :id="item.id">
              <h4>{{ item.name }}</h4>
              <h5>{{ item.date }}</h5>
              <p>{{ item.message }}</p>
              <button class="delBtn" v-if="role == 'admin'" @click="delMsg">Supprimer</button>
            </li>
          </ul>
        </div>
        <div class="input">
          <input type="text" placeholder="Ecrivez votre message ici" id="text-input" v-model="message.msg">
          <div class="send" @click="postMsg()">
            <img src="../assets/send.svg" alt="send arrow">
          </div>
        </div>
      </div>

      <button id="downBtn" @click="scrollDawn()">Voir les derniers messages</button>

      <div id="forumMedia">
        <div id="mediaBox">
          <div v-for="item in mediaInfo" :key="item" :id="item.id" class="media">
            <h4>{{ item.lastname }}</h4>
            <img class="image" :src="require(`@/assets/images/${item.url}`)">
            <button class="delBtn" v-if="role == 'admin'" @click="delMedia">Supprimer</button>
          </div>
        </div>
        <div class="input">
          <input type="file" @change="postMedia" name="uploaded_file" placeholder="Ecrivez votre message ici"
            id="files">
          <button type="submit" class="send send-media" @click="onUpload()">
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
            this.media = null
            document.getElementById("files").value = ""
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
            let elm = document.getElementById('mediaBox');
            elm.scrollTop = elm.scrollHeight;
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
      },

      scrollDawn() {
        this.getMsg()
        this.getMedia()

        setTimeout(() => {
          let media = document.getElementById('mediaBox');
          media.scrollTop = media.scrollHeight;

          let message = document.getElementById('message');
          message.scrollTop = message.scrollHeight;
        }, 500);
      }
    }
  }
</script>

<style lang="scss">
  ::-webkit-scrollbar {
    display: none;
  }

  .home {
    display: flex;
    flex-direction: column;
  }

  .delBtn {
    background-color: red;
    color: white;
    border: none;
    border-radius: 5px;
    height: 3vh;
  }

  #header {
    width: 30vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    align-self: center;

    #btn {
      width: 40%;
      height: 100%;
      display: flex;
      flex-direction: column;

      button {
        margin: 0.5vh 0;
        height: 3vh;
        border-radius: 5px;
        border: none;
      }

      button:first-child {
        background-color: rgba(0, 0, 0, 0.822);
        color: white;
      }
    }
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

          button {
            margin-top: 1vh;
          }
        }
      }
    }

    #downBtn {
      height: 4vh;
      align-self: flex-end;
      border-radius: 10px;
      border: 2px solid black;
    }

    #forumMedia {
      position: relative;
      width: 40vw;
      height: 60vh;
      box-shadow: 0px 0px 10px #b3b1b1;
      border-radius: 15px;

      #mediaBox {
        width: 100%;
        height: 90%;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: scroll;


        .media {
          width: 95%;
          display: flex;
          flex-direction: column;
          border-bottom: 1px solid #000;

          h4 {
            margin-top: 1vh;
          }

          img {
            margin-top: 0.5vh;
            width: 100%;
            height: auto;
            object-fit: cover;
            align-self: center;
            margin-bottom: 1vh;
          }

          button {
            margin-top: 1vh;
            width: 25%;
            margin-bottom: 2vh;
          }
        }
      }
    }

    #test {
      color: white;
    }

    .input {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 5vh;
      position: absolute;
      bottom: 0px;
      background-color: black;
      border-radius: 0px 0px 15px 15px;

      #files {
        color: white;
        margin-left: 4vh;
      }

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
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        border-radius: 10px;
        margin-right: 1vh;

        img {
          height: 60%;
          width: auto;
        }
      }

      #text-input {
        width: 85%;
        height: 60%;
        outline: none;
        border: 1px solid black;
        border-radius: 10px;
        padding: 5px;
        margin-left: 1vh;
      }
    }
  }
</style>