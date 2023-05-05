<script>
import tracks from "../assets/audio/tracks";

export default {
  name: "PokemonMusic",
  computed: {
    pokemonView() {
      return this.$store.state.pokemonView;
    },
  },
  mounted() {
    console.log("music mounted");
    console.log(this.pokemonView);
  },
};
</script>

<template>
  <div v-if="pokemonView === false">
    <div
      v-for="(url, name, index) in tracks"
      :key="index"
      :class="currentTrackIndex === index ? 'selected' : ''"
    >
      {{ name }} Hello
    </div>
  </div>
</template>

<style scoped>
.music-screen {
  transform: translate(10%, 80%);
  height: 35%;
  width: 83%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  border-radius: 10px;
  padding: 0.5rem;
}
.selected {
  color: red;
  font-weight: bolder;
  text-shadow: 2px 2px 10px yellow;
}
@media (max-width: 450px) {
  .music-screen {
    transform: translate(14%, 83%);
    font-size: 0.8rem;
  }
}

@media (max-width: 380px) {
  .music-screen {
    transform: translate(10%, 79%);
    font-size: 0.8rem;
  }
}
</style>
