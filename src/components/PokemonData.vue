<script>
import PokemonMusic from "./PokemonMusic.vue";

export default {
  name: "PokemonData",
  components: {
    PokemonMusic,
  },
  computed: {
    pokemonView() {
      return this.$store.state.pokemonView;
    },
    pokemonInfo() {
      return this.$store.state.pokemonInfo;
    },
    classicView() {
      return this.$store.state.classicView;
    },
  },
  mounted() {
    console.log("PokemonData mounteed");
  },
};
</script>

<template>
  <img
    :src="classicView ? pokemonInfo.classicSprite : pokemonInfo.sprite"
    alt="pokemon"
  />
  <div id="pokemon-info">#{{ pokemonInfo.id }} {{ pokemonInfo.name }}</div>
</template>

<style scoped>
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
