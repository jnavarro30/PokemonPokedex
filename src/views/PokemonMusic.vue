<script setup>
import { toRefs } from "vue";
import pokemonTracks from "../assets/audio/tracks";

const props = defineProps({
  currentTrackIndex: Number,
  darkView: Boolean,
  setDarkView: Function
});
const { currentTrackIndex, darkView, setDarkView } = toRefs(props);
</script>

<template>
  <div 
    class="absolute text-sm w-[82%] h-[35%] top-[27.5%] left-[8.5%] rounded-xl border-black border-2 grid grid-cols-2 p-3 justify-content items-center"
    :class="darkView ? 'bg-black' : 'bg-white'"
    @click="setDarkView"
  >
    <div
      v-for="(url, name, index) in pokemonTracks"
      class="text-center text-sm"
      :class="darkView ? 'text-white' : '', currentTrackIndex === -index ? (darkView ? 'dark-selected' : 'light-selected') : ''"
      :key="index"
    >
      {{ name }}
    </div>
  </div>
</template>

<style scoped>
.light-selected {
  color: blue;
  text-shadow:
    -1px -1px 0 yellow,
     1px -1px 0 yellow,
    -1px  1px 0 yellow,
     1px  1px 0 yellow;
}
.dark-selected {
  color: yellow;
  text-shadow:
    -1px -1px 0 blue,
     1px -1px 0 blue,
    -1px  1px 0 blue,
     1px  1px 0 blue;
}
</style>
