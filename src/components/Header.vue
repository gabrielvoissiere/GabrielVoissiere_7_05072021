<template>
    <header>
        <router-link class="link" to="/" @click="logout()">Se déconnecter</router-link>
    </header>
    <router-view />
</template>

<script>
    export default {
        name: "Header",
        data() {
            return {
                //
            }
        },
        methods: {
            logout() {
                sessionStorage.clear()
            }
        },
    }
</script>

<style lang="scss">
    header {
        width: 100%;
        display: flex;
        justify-content: center;
        background-color: black;

        .link {
            margin-left: 10px;
            margin-right: 10px;
            margin-top: 20px;
            margin-bottom: 20px;
            color: white;
            text-decoration: none;
        }
    }
</style>