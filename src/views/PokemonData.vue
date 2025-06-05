<script setup>
import { ref, toRefs } from "vue";

const props = defineProps({
  pokemonInfo: Object,
  classicView: Boolean,
  darkView: Boolean,
  setDarkView: Function
});
const { classicView, pokemonInfo, darkView, setDarkView } = toRefs(props);
</script>

<template>
  <div
    class="absolute w-[82%] h-[35%] top-[27.5%] left-[8.5%] rounded-xl border-black border-2 flex flex-col justify-content items-center"
    :class="darkView ? 'bg-black' : 'bg-white'"
    @click="setDarkView"
  >
    <img
      class="w-full h-full"
      :src="classicView ? pokemonInfo.classicSprite : pokemonInfo.sprite"
      alt="pokemon"
    />
    <!-- <div class="">#{{ pokemonInfo.id }} {{ pokemonInfo.name }}</div> -->
  </div>
</template>
