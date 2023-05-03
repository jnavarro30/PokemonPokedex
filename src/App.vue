<script setup>
import Pokedex from './components/Pokedex.vue';
</script>

<template>
  <div class="app">
    <Pokedex />
  </div>
</template>

<style scoped>
.app {
  height: 100vh;
  background-image: url("./assets/images/thimo-pedersen-TWCnHKKhqSo-unsplash.jpg");
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Pokemon Solid", sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
}
</style>
