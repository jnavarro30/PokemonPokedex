<template>
  <div
    v-if="pokemonView"
    class="pokedex-screen"
    :class="darkView ? 'dark-view' : ''"
    @click="setDarkView"
  >
    <PokemonData />
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
</style>
