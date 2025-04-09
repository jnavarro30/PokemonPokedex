<script setup>
import { toRefs } from "vue"

const props = defineProps({
  pokemonInfo: Object,
  classicView: Boolean
})

const { classicView, pokemonInfo } = toRefs(props)
</script>

<template>
  <div>
    <img
    :src="classicView ? pokemonInfo.classicSprite : pokemonInfo.sprite"
    alt="pokemon"
  />
  <div id="pokemon-info">#{{ pokemonInfo.id }} {{ pokemonInfo.name }}</div>
  </div>
</template>

<style scoped>
img {
  height: 90%;
  width: 90%;
}
#pokemon-info {
  font-weight: bolder;
  text-transform: capitalize;
}
</style>
