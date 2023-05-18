<script>
import { mapGetters } from "vuex";
export default {
  name: "PokemonData",
  computed: {
    ...mapGetters(["pokemonInfo", "classicView"]),
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
</style>
