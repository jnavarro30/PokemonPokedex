<script setup>
import { ref, toRefs } from "vue";
import pokemonTracks from "../assets/audio/tracks";

const props = defineProps({
  currentTrackIndex: Number
});
const { currentTrackIndex } = toRefs(props);

const testFunc = () => {
  console.log('the current track = ', currentTrackIndex)
  console.log(pokemonTracks['Celadon City'])
}
</script>

<template>
  <div class="absolute text-sm w-[82%] h-[35%] top-[27.5%] left-[8.5%] rounded-xl border-black border-2 grid grid-cols-2 p-3 justify-content items-center">
    <div
      v-for="(url, name, index) in pokemonTracks"
      class="track"
      :class="currentTrackIndex === -index ? 'selected' : ''"
      :key="index"
      @click="testFunc"
    >
      {{ name }}
    </div>
  </div>
  <!-- <div class="absolute w-[82%] h-[35%] top-[27.5%] left-[8.5%] rounded-xl border-black border-2 flex flex-col justify-content items-center">
    <span class="text-2xl p-[5rem] h-[100%] w-[100%] bg-yellow-500 rounded-xl">COMING SOON</span>
  </div> -->
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
