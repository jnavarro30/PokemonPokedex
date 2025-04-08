<script setup>
import {useStore } from "vuex";
import { computed, toRefs } from "vue"

const store = useStore()
// const pokemonInfo = computed(() => store.getters.pokemonInfo)
// const classicView = computed(() => store.getters.classicView)

const props = defineProps({
  pokemonInfo: Object,
  classicView: Boolean
})
const { classicView, pokemonInfo } = toRefs(props)
</script>

<template>
  <img
    :src="classicView ? pokemonInfo.classicSprite : pokemonInfo.sprite"
    alt="pokemon"
  />
  <div id="pokemon-info">#{{ pokemonInfo.id }} {{ pokemonInfo.name }}</div>
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
