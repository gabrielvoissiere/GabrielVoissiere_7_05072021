<template>
    <header>
        <router-link to="/">Accueil</router-link>
        <router-link to="/profil">Mon profil</router-link>
    </header>
    <router-view />
</template>

<script>
    export default {
        name: "Header"
    }
</script>