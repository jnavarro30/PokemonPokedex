<script>
export default {
  name: "PokemonMusic",
  computed: {
    pokemonView() {
      return this.$store.getters.pokemonView;
    },
    pokemonTracks() {
      return this.$store.getters.pokemonTracks;
    },
    currentTrackIndex() {
      return this.$store.getters.currentTrackIndex;
    },
  },
};
</script>

<template>
  <div
    v-for="(url, name, index) in pokemonTracks"
    class="track"
    :class="currentTrackIndex === -index ? 'selected' : ''"
    :key="index"
  >
    {{ name }}
  </div>
</template>

<style scoped>
.track {
  padding: 0.2rem;
}
.selected {
  color: red;
  font-weight: bolder;
  text-shadow: 2px 2px 10px yellow;
}
@media (max-width: 380px) {
  .track {
    padding: 0;
  }
}
</style>
