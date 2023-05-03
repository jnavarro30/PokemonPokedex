<script setup>
import tracks from "../assets/audio/tracks";

const props = defineProps({
  pokedexScreen: Boolean,
  currentTrackIndex: Number,
  darkView: Boolean,
});

const emits = defineEmits(["setDarkView"]);

// const formatTracks = tracks.map((track, index) => {
//   const info = Object.entries(track);
//   return `<div class="currentTrackIndex === index ? 'selected' : ''" key="index">{{info[0][0]}}</div>`;
// });
</script>

<template>
  <div v-if="pokedexScreen === false">
    <div
      v-for="(url, name, index) in tracks"
      :key="index"
      :class="currentTrackIndex === index ? 'selected' : ''"
    >
      {{ name }}
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
