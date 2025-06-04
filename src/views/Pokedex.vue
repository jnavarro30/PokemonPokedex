<template>
  <div
    class="relative h-98/100 w-96/100 bg-[length:100%_100%] border-5 rounded-xl bg-[url('../assets/images/pokedex.png')]"
  >
    <PokemonData
      v-if="!musicView"
      :pokemonInfo="pokemonInfo"
      :classicView="classicView"
    />
    <PokemonMusic 
      v-else
      :currentTrackIndex="currentTrackIndex"
    />
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
import { watch, onMounted, ref } from "vue";
import PokemonData from "./PokemonData.vue";
import PokemonMusic from "./PokemonMusic.vue";
import tracks from "../assets/audio/tracks";
import axios from "axios";

let musicView = ref(false);
let pokemonParam = ref(1);
let pokemonInfo = ref({});
let currentTrack = new Audio(tracks["Celadon City"]);
let currentTrackIndex = ref(0);
let isPlaying = ref(false);
let classicView = ref(false);
let userInput = ref("");

const soundEffect = elem => {
  let wav = '';
  switch(elem) {
    case 'dpad':
      wav = "/audio/dpad.wav";
      break;
    case 'blue':
      wav = '/audio/blue.wav';
      break;
    case 'orange', 'green', 'input':
      wav = '/audio/orange-green.wav';
      break;
    case 'red':
      wav = '/audio/red.wav';
      break;
    case 'speaker':
      wav = '/audio/scifi.wav'
      break;
    default:
      wav = '';
  }
  new Audio(wav).play();
}

const setPokemonParam = (value) => {
  if (value < 1) return;
  pokemonParam.value = value;
};
const setPokemonInfo = (value) => {
  pokemonInfo.value = value;
};

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
    alert(`Invalid Entry: ${userInput.value}`);
    console.error(err);
  }
};

const setCurrentTrackIndex = (index, direction) => {
  currentTrackIndex.value = index;

  if (direction === "up") {
    if(currentTrackIndex.value === 0 || currentTrackIndex.value === -1) return;
    soundEffect('dpad');
    currentTrackIndex.value += 2;
  } else if (direction === "right") {
    if(currentTrackIndex.value % 2 !== 0) return;
    soundEffect('dpad');
    currentTrackIndex.value -= 1;
  } else if (direction === "down") {
    if(currentTrackIndex.value === -8 || currentTrackIndex.value === -9) return;
    soundEffect('dpad');
    currentTrackIndex.value -= 2;
  } else if (direction === "left") {
    if(currentTrackIndex.value % 2 === 0) return;
    soundEffect('dpad');
    currentTrackIndex.value += 1;
  } else {
    throw Error("Enter a valid argument: up, down, left or right.");
  }
};

const controllerDpad = (direction) => {
  if (!musicView.value) {
    if (direction === "up" || direction === "right") {
      soundEffect('dpad');
      setPokemonParam(pokemonParam.value + 1);
    } else if (direction === "down" || direction === "left") {
      if (pokemonParam.value === 1) return;
      soundEffect('dpad');
      setPokemonParam(pokemonParam.value - 1);
    } else {
      throw Error("Enter a valid argument: up, down, left or right.");
    }
  } else {
    setCurrentTrackIndex(currentTrackIndex.value, direction);
  }
};

const blueBtn = () => {
  if (userInput.value === "") return;
  soundEffect('blue');
  fetchPokemon();
  userInput.value = "";
};

const greenBtn = () => {
  soundEffect('green');
  classicView.value = !classicView.value;
};

const inputField = (event) => {
  soundEffect('input');
};

const redBtn = () => {
  soundEffect('red');
  pokemonParam.value = 1;
  musicView.value = false;
  classicView.value = false;
  userInput.value = "";
  setCurrentTrackIndex(0);
};

const orangeBtn = () => {
  soundEffect('orange');
  musicView.value = !musicView.value;
};

const speakerBtn = () => {
  soundEffect('speaker');
  let url = Object.values(tracks)[Math.abs(currentTrackIndex.value)];

  if (currentTrack.src === url) {
    if (isPlaying.value) {
      isPlaying.value = false;
      currentTrack.pause();
    } else {
      isPlaying.value = true;
      currentTrack.play();
    }
  } else {
    currentTrack.pause();
    currentTrack.src = url;
    currentTrack.play();
    isPlaying.value = true;
  }
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
.btn {
  position: absolute;
  /* show/hide buttons */
  /* background: black; */
}
</style>
