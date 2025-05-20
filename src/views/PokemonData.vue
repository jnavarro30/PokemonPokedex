<script setup>
import { ref, toRefs } from "vue"

const props = defineProps({
  pokemonInfo: Object,
  classicView: Boolean
})
const { classicView, pokemonInfo } = toRefs(props)
let darkView=  ref(false)

const setDarkView = () => {
  darkView.value = !darkView.value
}
</script>

<template>
  <div class="pokedex-screen absolute flex flex-col justify-content items-center" :class="darkView ? 'bg-black' : 'bg-cyan-100'" @click="setDarkView">
    <img
      class="w-full h-full"
      :src="classicView ? pokemonInfo.classicSprite : pokemonInfo.sprite"
      alt="pokemon"
    />
    <!-- <div class="">#{{ pokemonInfo.id }} {{ pokemonInfo.name }}</div> -->
  </div>
</template>
