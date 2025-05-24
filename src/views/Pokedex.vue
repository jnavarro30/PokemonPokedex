<template>
  <div
    class="relative h-98/100 w-96/100 bg-[length:100%_100%] border-5 rounded-xl bg-[url('../assets/images/pokedex.png')]"
  >
    <PokemonData
      v-if="!musicView"
      :pokemonInfo="pokemonInfo"
      :classicView="classicView"
    />
    <PokemonMusic v-else />
    <div
      class="btn h-[8%] w-[12%] top-[75%] left-[75%]"
      @click="controllerDpad('up')"
    ></div>
    <div
      class="btn h-[7%] w-[12%] top-[81%] left-[86%]"
      @click="controllerDpad('right')"
    ></div>
    <div
      class="btn h-[8%] w-[12%] top-[86%] left-[75%]"
      @click="controllerDpad('down')"
    ></div>
    <div
      class="btn h-[7%] w-[12%] top-[81%] left-[65%]"
      @click="controllerDpad('left')"
    ></div>
    <div
      class="btn h-[5%] w-[10%] top-[64.5%] left-[19.5%]"
      @click="redBtn"
    ></div>
    <div
      class="btn h-[8%] w-[15%] top-[73.6%] left-[4%]"
      @click="blueBtn"
    ></div>
    <div
      class="btn h-[4%] w-[18%] top-[76%] left-[22.5%]"
      @click="greenBtn"
    ></div>
    <div
      class="btn h-[4%] w-[18%] top-[76%] left-[44.5%]"
      @click="orangeBtn"
    ></div>
    <div
      class="btn h-[7%] w-[25%] top-[64%] left-[60.5%]"
      @click="speakerBtn"
    ></div>
    <input
      class="btn bg-transparent h-[11%] w-[37%] top-[85%] left-[20.4%] text-[1.1rem] border-none p-[1rem] focus:outline-none"
      type="text"
      name="input"
      :value="userInput"
      @input="(event) => (userInput = event.target.value)"
      @click="inputField"
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

let musicView = ref(false);
let pokemonParam = ref(1);
let pokemonInfo = ref({});
let currentTrack = new Audio(tracks["Celadon City"]);
let currentTrackIndex = ref(0);
let isPlaying = ref(false);
let classicView = ref(false);
let userInput = ref("");

const setPokemonParam = (value) => {
  if (value < 1) return;
  pokemonParam.value = value;
};
const setPokemonInfo = (value) => {
  pokemonInfo.value = value;
};
// const setCurrentTrackIndex = (value) => store.dispatch("setCurrentTrackIndex", value);

const fetchPokemon = async () => {
  try {
    let param = userInput.value ? userInput.value : pokemonParam.value;
    let body = await axios.get(`https://pokeapi.co/api/v2/pokemon/${param}`);

    let pokemon = body.data;
    let { id, name } = pokemon;
    let classicSprite = pokemon.sprites.front_default;
    let sprite = pokemon.sprites.other.dream_world.front_default;

    if (param !== pokemonParam) {
      setPokemonParam(id);
    }

    setPokemonInfo({
      id,
      name,
      classicSprite,
      sprite,
    });
  } catch (err) {
    alert(`Invalid Entry: ${store.getters.userInput}`);
    console.error(err);
  }
};

const setCurrentTrackIndex = (value) =>
  store.dispatch("setCurrentTrackIndex", value);

const controllerDpad = (direction) => {
  const audio = new Audio('/audio/dpad.wav');
  audio.play();
  if (!musicView.value) {
    if (direction === "up" || direction === "right") {
      setPokemonParam(pokemonParam.value + 1);
    } else if (direction === "down" || direction === "left") {
      setPokemonParam(pokemonParam.value - 1);
    } else {
      throw Error("Enter a valid argument: up, down, left or right.");
    }
  } else {
    if (direction === "up" || direction === "right") {
      setCurrentTrackIndex(currentTrackIndex.value + 1);
    } else if (direction === "down" || direction === "left") {
      setCurrentTrackIndex(currentTrackIndex.value - 1);
    } else {
      throw Error("Enter a valid argument: up, down, left or right.");
    }
  }
};

const blueBtn = () => {
  if (userInput.value === "") return;
  const audio = new Audio('/audio/blue.wav');
  audio.play();
  fetchPokemon();
  userInput.value = "";
};

const greenBtn = () => {
  const audio = new Audio('/audio/orange-green.wav');
  audio.play();
  classicView.value = !classicView.value
};

const inputField = (event) => {
  const audio = new Audio('/audio/orange-green.wav');
  audio.play();
};

const redBtn = () => {
  const audio = new Audio('/audio/red.wav');
  audio.play();
  pokemonParam.value = 1;
  musicView.value = false;
  classicView.value = false;
  userInput.value = "";
};

const orangeBtn = () => {
  const audio = new Audio('/audio/orange-green.wav');
  audio.play();
  musicView.value = !musicView.value;
};

const speakerBtn = () => {
  console.log("speaker button");
  const audio = new Audio('/audio/scifi.wav');
  audio.play();
  // console.log("orange button = ", musicView.value);
  // musicView.value = !musicView.value;
};;

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
.btn {
  position: absolute;
  /* show/hide buttons */
  /* background: black; */
}
</style>
