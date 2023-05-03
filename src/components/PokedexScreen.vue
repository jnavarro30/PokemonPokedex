<script setup>
const props = defineProps({
  pokedexScreen: Boolean,
  pokemonParam: Number,
  pokemonInfo: Object,
  darkView: Boolean,
});

const emits = defineEmits(["setDarkView"]);
</script>

<template>
  <div
    v-if="pokedexScreen === true"
    class="pokedex-screen"
    :class="darkView ? 'dark-view' : ''"
    @click="emits('setDarkView')"
  >
    <!-- <img :src="pokemonInfo.sprite" alt='pokemon' /> -->
    <img
      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
      alt="pokemon"
    />
    <div id="pokemon-info">
      #{{ pokemonInfo.id }} Info Here {{ pokemonInfo.name }}
    </div>
  </div>
</template>

<style scoped>
.pokedex-screen {
  transform: translate(10%, 80%);
  height: 35%;
  width: 83%;
  background-color: rgba(37, 169, 245, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 10px;
}
img {
  height: 90%;
  width: 90%;
}
#pokemon-info {
  font-weight: bolder;
  text-transform: capitalize;
}
.dark-view {
  background-color: black;
  color: #ffffff;
}
</style>
