<template>
  <div class="pokedex">
    <PokemonData 
      v-if="pokemonView"
      :pokemonInfo="pokemonInfo"
      :classicView="classicView"
    />
    <PokemonMusic v-else />
    <div
      class="up-btn btn"
      @click="
        pokemonView
          ? setPokemonParam(pokemonParam + 1)
          : setCurrentTrackIndex(currentTrackIndex + 1)
      "
    ></div>
    <div
      class="right-btn btn"
      @click="
        pokemonView
          ? setPokemonParam(pokemonParam + 1)
          : setCurrentTrackIndex(currentTrackIndex + 1)
      "
    ></div>
    <div
      class="bottom-btn btn"
      @click="
        pokemonView
          ? setPokemonParam(pokemonParam - 1)
          : setCurrentTrackIndex(currentTrackIndex - 1)
      "
    ></div>
    <div
      class="left-btn btn"
      @click="
        pokemonView
          ? setPokemonParam(pokemonParam - 1)
          : setCurrentTrackIndex(currentTrackIndex - 1)
      "
    ></div>
    <div class="red-btn btn" @click="redBtn"></div>
    <div class="blue-btn btn" @click="blueBtn"></div>
    <div class="green-btn btn" @click="setClassicView"></div>
    <div class="orange-btn btn" @click="setPokemonView"></div>
    <div class="speaker-btn btn" @click="speakerBtn"></div>
    <input
      class="input-btn btn"
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

// Custom method
const blueBtn = () => {
  fetchPokemon();
  setUserInput("");
};

// Watcher (replacing Vue 2's `watch` object)
watch(pokemonParam, () => {
  fetchPokemon();
});

// Lifecycle hook (replacing `mounted`)
onMounted(() => {
  fetchPokemon();
});
</script>

<style scoped>
.pokedex {
  position: relative;
  height: 98%;
  width: 96%;
  max-width: 600px;
  background-image: url("../assets/images/pokedex.png");
  background-size: 100% 100%;
  border: 5px solid black;
  border-radius: 4%;
}
::placeholder {
  font-family: "Pokemon Solid", sans-serif;
}

.dark-view {
  background-color: black;
  color: #ffffff;
}
/* CONTROLS */
.btn {
  position: absolute;
  /* show buttons */
  /* background: black; */
}

.up-btn {
  height: 8%;
  width: 12%;
  top: 75%;
  left: 75%;
}
.bottom-btn {
  height: 8%;
  width: 12%;
  top: 86%;
  left: 75%;
}

.right-btn {
  height: 7%;
  width: 12%;
  top: 81%;
  left: 86%;
}
.left-btn {
  height: 7%;
  width: 12%;
  top: 81%;
  left: 65%;
}

.red-btn {
  height: 5%;
  width: 10%;
  top: 64.5%;
  left: 19.5%;
}

.blue-btn {
  height: 8%;
  width: 15%;
  top: 73.6%;
  left: 4%;
}

.green-btn {
  height: 4%;
  width: 18%;
  top: 76%;
  left: 22.5%;
}

.orange-btn {
  height: 4%;
  width: 18%;
  top: 76%;
  left: 44.5%;
}

.speaker-btn {
  height: 7%;
  width: 25%;
  top: 64%;
  left: 60.5%;
}

.input-btn {
  background: transparent;
  height: 10%;
  width: 36%;
  top: 85.4%;
  left: 20.5%;
  font-size: 1.1rem;
  border: none;
}
</style>
