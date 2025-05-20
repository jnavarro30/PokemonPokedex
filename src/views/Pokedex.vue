<template>
  <div 
    class="relative h-98/100 w-96/100 bg-[length:100%_100%] border-5 rounded-xl bg-[url('../assets/images/pokedex.png')]"
  >
    <PokemonData 
      v-if="pokemonView"
      :pokemonInfo="pokemonInfo"
      class="inset-y-57.5 inset-x-8.5 w-73.5 h-70 rounded-xl border-black border-2"
      :classicView="classicView"
    />
    <PokemonMusic v-else />
    <div
      class="btn h-[8%] w-[12%] top-[75%] left-[75%]"
      @click="
        pokemonView
          ? setPokemonParam(pokemonParam + 1)
          : setCurrentTrackIndex(currentTrackIndex + 1)
      "
    ></div>
    <div
      class="btn h-[7%] w-[12%] top-[81%] left-[86%]"
      @click="
        pokemonView
          ? setPokemonParam(pokemonParam + 1)
          : setCurrentTrackIndex(currentTrackIndex + 1)
      "
    ></div>
    <div
      class="btn h-[8%] w-[12%] top-[86%] left-[75%]"
      @click="
        pokemonView
          ? setPokemonParam(pokemonParam - 1)
          : setCurrentTrackIndex(currentTrackIndex - 1)
      "
    ></div>
    <div
      class="btn h-[7%] w-[12%] top-[81%] left-[65%]"
      @click="
        pokemonView
          ? setPokemonParam(pokemonParam - 1)
          : setCurrentTrackIndex(currentTrackIndex - 1)
      "
    ></div>
    <div class="btn h-[5%] w-[10%] top-[64.5%] left-[19.5%]" @click="redBtn"></div>
    <div class="btn h-[8%] w-[15%] top-[73.6%] left-[4%]" @click="blueBtn"></div>
    <div class="btn h-[4%] w-[18%] top-[76%] left-[22.5%]" @click="setClassicView"></div>
    <div class="btn h-[4%] w-[18%] top-[76%] left-[44.5%]" @click="setPokemonView"></div>
    <div class="btn h-[7%] w-[25%] top-[64%] left-[60.5%]" @click="speakerBtn"></div>
    <input
      class="btn bg-transparent h-[11%] w-[37%] top-[85%] left-[20.4%] text-[1.1rem] border-none"
      type="text"
      name="input"
      :value="userInput"
      @input="(event) => setUserInput(event.target.value)"
      placeholder="Name/ID"
    />
  </div>
</template>

<script setup>
import { computed, watch, onMounted, ref } from "vue";
import { useStore } from "vuex";
import PokemonData from "./PokemonData.vue";
import PokemonMusic from "./PokemonMusic.vue";
import tracks from "../assets/audio/tracks";
import axios from "axios";
const store = useStore();

let pokemonView= ref(true)
let pokemonParam = ref(1)
let pokemonInfo=  ref({})
let currentTrack= new Audio(tracks["Celadon City"])
let currentTrackIndex=  ref(0)
let isPlaying= ref(false)
let classicView= ref(false)
let darkView=  ref(false)
let userInput=  ref("")

const setPokemonView = () => {
  pokemonView.value = !pokemonView.value
  console.log('pokemonView', pokemonView.value)
};

const setPokemonParam = (value) => {
  if (value < 1) return
  pokemonParam.value = value
  console.log('the value = ', pokemonParam.value)
};
const setPokemonInfo = (value) => {
  pokemonInfo.value = value
}
// const setCurrentTrackIndex = (value) => store.dispatch("setCurrentTrackIndex", value);
const setClassicView = () => {
  classicView.value = !classicView.value
  console.log('it is classic', classicView.value)
}
const setDarkView = () => {
  console.log('set dark view')
  darkView.value = !darkView.value
  console.log('darkView = ',darkView.value)
}

const fetchPokemon = async () => {
  try {
    console.log(userInput.value, 'huh')
    let param = userInput.value
      ? userInput.value
      : pokemonParam.value;
      console.log('the param', param)
    let body = await axios.get(`https://pokeapi.co/api/v2/pokemon/${param}`);

    let pokemon = body.data;
    let { id, name } = pokemon;
    let classicSprite = pokemon.sprites.front_default;
    let sprite = pokemon.sprites.other.dream_world.front_default;

    if (param !== pokemonParam) {
      setPokemonParam(id)
    }

    setPokemonInfo({
      id,
      name,
      classicSprite,
      sprite,
    })
  } catch (err) {
    alert(`Invalid Entry: ${store.getters.userInput}`);
    console.error(err);
  }
};

const setCurrentTrackIndex = (value) => store.dispatch("setCurrentTrackIndex", value);
const setUserInput = (value) => store.dispatch("setUserInput", value);
const redBtn = () => store.dispatch("redBtn");
const speakerBtn = () => store.dispatch("speakerBtn");

const blueBtn = () => {
  fetchPokemon();
  setUserInput("");
};

watch(pokemonParam, () => {
  fetchPokemon();
});

onMounted(() => {
  fetchPokemon();
});
</script>

<style scoped>
::placeholder {
  font-family: "Pokemon Solid", sans-serif;
}
/* CONTROLS */
.btn {
  position: absolute;
  /* show buttons */
  background: black;
}
</style>
