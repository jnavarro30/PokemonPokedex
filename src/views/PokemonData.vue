<script setup>
import { ref, toRefs } from "vue"

const props = defineProps({
  pokemonInfo: Object,
  classicView: Boolean
})
const { classicView, pokemonInfo } = toRefs(props)
let darkView=  ref(false)

const setDarkView = () => {
  console.log('set dark view')
  darkView.value = !darkView.value
  console.log('darkView = ',darkView.value)
}
</script>

<template>
  <div class="pokedex-screen absolute flex flex-col justify-content items-center bg-red-500 border-black-500" :class="darkView ? 'bg-black' : ''" @click="setDarkView">
    <img
      class=""
      :src="classicView ? pokemonInfo.classicSprite : pokemonInfo.sprite"
      alt="pokemon"
    />
    <div class="bg-blue-500">#{{ pokemonInfo.id }} {{ pokemonInfo.name }}</div>
  </div>
</template>

<style scoped>
.pokedex-screen {
  /* background-color: yellow; */
  /* opacity: 50%; */
  /* position: absolute; */
  top: 27.6%;
  /* left: 7.5%; */
  /* height: 33%; */
  /* width: 80%; */
  border-radius: 30px;
}
.dark-view {
  background-color: black;
  color: #ffffff;
}
</style>
