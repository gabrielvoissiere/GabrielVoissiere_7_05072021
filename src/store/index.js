import {
  createStore
} from 'vuex'
const axios = require('axios');

export default createStore({
  state: {
    msgData: [],
    mediaData: [],
    message: {},
    media: {},
    msgId: {},
    mediaId: {}
  },
  actions: {
    getMsgData({
      commit
    }) {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
      }

      axios.get("http://localhost:3000/api/msg", config)
        .then(response => {
          commit("updateMsgData", response.data)
        })
    },
    getMediaData({
      commit
    }) {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
      }

      axios.get("http://localhost:3000/api/msg/media", config)
        .then(response => {
          commit("updateMediaData", response.data)
        })
    },
    postMsgData() {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
      }
      axios
        .post("http://localhost:3000/api/msg", this.state.message, config)
        .then((response) => {
          if (response.statusText == "OK") {
            console.log("ok");
          }
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    postMediaData() {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
      }
      axios
        .post("http://localhost:3000/api/msg/media", this.state.media, config)
        .then((response) => {
          if (response.statusText == "OK") {
            console.log("ok");
          }
        })
        .catch((error) => {
          console.log(error.response);
        });
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
    },
    delMsg() {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        },
      }

      axios
        .post("http://localhost:3000/api/msg/delete", this.state.msgId, config)
        .then(response => {
          console.log(response);
          console.clear()
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    delMedia() {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        },
      }

      axios
        .post("http://localhost:3000/api/msg/deleteMedia", this.state.mediaId, config)
        .then(response => {
          console.log(response);
          this.getMedia()
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  },
  mutations: {
    updateMsgData(state, data) {
      state.msgData = data
    },
    updateMediaData(state, data) {
      state.mediaData = data
    },
    postMsg(state, data) {
      state.message = data
    },
    postMedia(state, data) {
      state.media = data
    },
    delMsg(state, data) {
      state.msgId = data
    },
    delMedia(state, data) {
      state.mediaId = data
    }
  },
  modules: {}
})