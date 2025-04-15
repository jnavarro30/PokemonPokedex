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
  <div class="pokedex-screen bg-blue-500" :class="darkView ? 'dark-view' : ''" @click="setDarkView">
    <img
    :src="classicView ? pokemonInfo.classicSprite : pokemonInfo.sprite"
    alt="pokemon"
  />
  <div id="pokemon-info">#{{ pokemonInfo.id }} {{ pokemonInfo.name }}</div>
  </div>
</template>

<style scoped>
.pokedex-screen {
  position: absolute;
  top: 27.6%;
  left: 7.5%;
  height: 33%;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 30px;
}
img {
  height: 90%;
  width: 90%;
}
#pokemon-info {
  font-weight: bolder;
  text-transform: capitalize;
}
.dark-view {
  background-color: black;
  color: #ffffff;
}
</style>
