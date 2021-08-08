<template>
    <div id="signup">

        <div id="global">
            <!-- logo de l'entreprise -->
            <img src="../assets/logo.svg" alt="">

            <!-- Boite de connexion -->
            <div id="signup-box">

                <div class="horizontal">
                    <!-- nom -->
                    <div class="signup-block">
                        <label for="firstname">Nom</label>
                        <input type="text" placeholder="Dupont" v-model="user.firstName">
                    </div>

                    <!-- prenom -->
                    <div class="signup-block">
                        <label for="lastname">Prénom</label>
                        <input type="text" placeholder="Jérémy" v-model="user.lastName">
                    </div>
                </div>

                <!-- mail -->
                <div class="signup-block email">
                    <label for="name">Email</label>
                    <input type="text" placeholder="j.dupont@gmail.com" v-model="user.email">
                </div>

                <div class="horizontal">
                    <!-- mot de passe -->
                    <div class="signup-block">
                        <!-- option pour afficher/masquer le mot de passe -->
                        <label for="password">Mot de passe <i @click="seen()" class="far fa-eye"></i></label>
                        <input :type="type" placeholder="******" v-model="user.password">
                    </div>

                    <!-- confirmation mot de passe -->
                    <div class="signup-block">
                        <!-- option pour afficher/masquer le mot de passe -->
                        <label for="password">Confirmer mot de passe</label>
                        <input :type="type" :placeholder="passwordPlaceholder" v-model="confirmPassword">
                    </div>
                </div>

                <button class="connection" @click="passwordVerification()">S'inscrire</button>

            </div>
        </div>

        <p id="copyright">copyright - Groupomania 2021</p>
    </div>
</template>

<script>
    // importation du composant Header
    const axios = require('axios');

    export default {
        name: "Login",
        data() {
            return {
                show: false,
                type: "password",
                passwordPlaceholder: '******',
                confirmPassword: "",
                user: {
                    firstName: "",
                    lastName: "",
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
            passwordVerification() {
                if (this.user.password != this.confirmPassword) {
                    this.confirmPassword = ''
                    this.passwordPlaceholder = 'mauvais mot de passe'
                } else {

                    axios
                        .post("http://localhost:3000/api/user/signup", this.user)
                        .then((response) => {
                            console.log(response.statusText);
                            if (response.statusText == "Created") {
                                this.$router.push({
                                    name: "Login"
                                })
                            }
                        })
                        .catch((error) => {
                            console.log(error.response);
                        });
                }
            }
        }
    }
</script>

<style lang="scss">
    #signup {
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
            margin-top: 12vh;

            img {
                margin-right: 4vh;
            }

            #signup-box {
                background-color: #ffffff;
                width: auto;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding: 40px;
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

                .signup-block {
                    display: flex;
                    flex-direction: column;
                    margin-bottom: 3vh;
                }

                .connection {
                    margin-top: 2vh;
                }

                .email {
                    width: 97%;
                }

                .horizontal {
                    display: flex;
                    margin-bottom: 3vh;

                    .signup-block {
                        margin: 0px 1vh;
                    }
                }
            }
        }

        #copyright {
            position: absolute;
            bottom: 2vh;
        }
    }
</style>