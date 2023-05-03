<script setup>
import { ref } from "vue";
import axios from "axios";
import PokedexScreen from "./PokedexScreen.vue";
import MusicScreen from "./MusicScreen.vue";

let pokedexScreen = ref(true);
let pokemonParam = ref(1);
let pokemonInfo = ref({});
let currentTrack = ref("");
let currentTrackIndex = ref(0);
let isPlaying = ref(false);
let classicView = ref(false);
let darkView = ref(false);

const setPokedexScreen = () => (pokedexScreen.value = !pokedexScreen.value);
const setPokemonParam = (num) => (pokemonParam.value = num);
const setPokemonInfo = (obj) => (pokemonParam.value = obj);
const setCurrentTrack = (str) => (currentTrack.value = str);
const setCurrentTrackIndex = (num) => (currentTrackIndex.value = num);
const setIsPlaying = (bool) => (isPlaying.value = bool);
const setClassicView = () => (classicView.value = !classicView.value);
const setDarkView = () => (darkView.value = !darkView.value);

const getPokemon = async () => {
  try {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonParam.value}`;
    let body = await axios.get(url);
    let pokemon = body.data;
    let { id, name } = pokemon;
    let sprite = classicView
      ? pokemon.sprites.front_default
      : pokemon.sprites.other.dream_world.front_default;

    setPokemonInfo({
      id,
      name,
      sprite,
    });
  } catch (err) {
    console.error(err);
    return;
  }
};

getPokemon();

const handleOnKeyDown = (e) => {
  switch (e.which) {
    case 37:
      arrowBtns("left");
      break;
    case 40:
      arrowBtns("bottom");
      break;
    case 38:
      arrowBtns("up");
      break;
    case 39:
      arrowBtns("right");
      break;
    default:
      return;
  }
  //    document.getElementsByClassName("pokedex")[0].focus()
  ref("pokedex")[0].focus();
};

// const setDarkView  = () => {
//     darkView = !darkView
// }
</script>

<template>
  <div ref="pokedex" class="pokedex" tabIndex="1" @keydown="handleOnKeyDown">
    <PokedexScreen
      :pokedexScreen="pokedexScreen"
      :pokemonParam="pokemonParam"
      :pokemonInfo="pokemonInfo"
      :darkView="darkView"
      @setPokedexScreen="setPokedexScreen"
      @setDarkView="
        {
          setDarkView;
        }
      "
    />
    <MusicScreen
      :pokedexScreen="pokedexScreen"
      :currentTrackIndex="currentTrackIndex"
      :darkView="darkView"
    />
    <!-- <div className='up-btn btn' onClick={() => arrowBtns('up')}></div>
        <div className='right-btn btn' onClick={() => arrowBtns('right')}></div>
        <div className='bottom-btn btn' onClick={() => arrowBtns('bottom')}></div>
        <div className='left-btn btn' onClick={() => arrowBtns('left')}></div>
        <div className='red-btn btn' onClick={() => redBtn()}></div>
        <div className='blue-btn btn' onClick={blueBtn}></div>
        <div className='green-btn btn' onClick={() => setClassicMode(!classicMode)}></div> -->
    <div class="orange-btn btn" @click="setPokedexScreen"></div>
    <!-- <div className='speaker-btn btn' onClick={speakerBtn}></div>
        <input className='input-btn btn' type='text' name='input' value={userInput} placeholder='Name/ID' onChange={handleOnChange} onKeyPress={handleOnKeyPress} autoComplete="off"/> -->
  </div>
</template>

<style scoped>
.pokedex {
  position: relative;
  height: 90%;
  width: 90%;
  max-width: 600px;
  background-image: url("../assets/images/pokedex.png");
  background-size: 100% 100%;
  border: 5px solid black;
  border-radius: 4%;
}
/* CONTROLS */
.btn {
  position: absolute;
}

.up-btn {
  height: 8%;
  width: 10%;
  transform: translate(750%, 490%);
}

.right-btn {
  height: 5%;
  width: 12%;
  transform: translate(700%, 930%);
}

.bottom-btn {
  height: 8%;
  width: 10%;
  transform: translate(750%, 630%);
}

.left-btn {
  height: 5%;
  width: 12%;
  transform: translate(550%, 930%);
}

.red-btn {
  height: 5%;
  width: 8%;
  transform: translate(245%, 590%);
}

.blue-btn {
  height: 8%;
  width: 12%;
  transform: translate(50%, 485%);
}

.green-btn {
  height: 3%;
  width: 18%;
  transform: translate(125%, 1380%);
}

.orange-btn {
  height: 3%;
  width: 18%;
  transform: translate(245%, 1380%);
}

.speaker-btn {
  height: 7%;
  width: 20%;
  transform: translate(315%, 405%);
}

.input-btn {
  height: 11%;
  width: 38%;
  transform: translate(52%, 455%);
}
</style>
