<script>
import { mapGetters } from "vuex";
export default {
  name: "PokemonMusic",
  computed: {
    ...mapGetters(["pokemonTracks", "currentTrackIndex"]),
  },
};
</script>

<template>
  <!-- <div
    v-for="(url, name, index) in pokemonTracks"
    class="track"
    :class="currentTrackIndex === -index ? 'selected' : ''"
    :key="index"
  >
    {{ name }}
  </div> -->
  <div class="absolute w-[82%] h-[35%] top-[27.5%] left-[8.5%] rounded-xl border-black border-2 flex flex-col justify-content items-center">
    <span class="text-2xl p-[5rem] h-[100%] w-[100%] bg-yellow-500 rounded-xl">COMING SOON</span>
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
