<script setup>
import Pokedex from "./views/Pokedex.vue";
</script>

<template>
  <div class="app h-screen bg-[url(@/assets/images/thimo-pedersen-TWCnHKKhqSo-unsplash.jpg)] bg-cover flex justify-center items-center tracking-widest uppercase font-pokemon">
    <Pokedex />
  </div>
</template>

<style scoped>
.font-pokemon {
  font-family: "Pokemon Solid", sans-serif;
}
</style>
