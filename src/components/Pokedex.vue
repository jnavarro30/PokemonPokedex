<script>
import PokemonData from "./PokemonData.vue";
import PokemonMusic from "./PokemonMusic.vue";
import { mapGetters, mapActions } from "vuex";
import { fetchPokemon } from "../utils/fetchPokemon";

export default {
  components: {
    PokemonData,
    PokemonMusic,
  },
  computed: {
    ...mapGetters([
      "pokemonView",
      "pokemonParam",
      "pokemonInfo",
      "currentTrackIndex",
      "userInput",
      "classicView",
      "darkView",
    ]),
  },
  methods: {
    ...mapActions([
      "setPokemonView",
      "setPokemonParam",
      "setPokemonInfo",
      "setCurrentTrackIndex",
      "setClassicView",
      "setDarkView",
      "setUserInput",
      "redBtn",
      "speakerBtn",
    ]),
    blueBtn() {
      fetchPokemon();
      this.setUserInput("");
    },
  },
  watch: {
    pokemonParam() {
      fetchPokemon();
    },
  },
  mounted() {
    fetchPokemon();
  },
};
</script>

<template>
  <div class="pokedex">
    <div
      v-if="pokemonView"
      class="pokedex-screen"
      :class="darkView ? 'dark-view' : ''"
      @click="setDarkView"
    >
      <PokemonData />
    </div>
    <div
      v-else
      class="pokedex-screen"
      :class="darkView ? 'dark-view' : ''"
      @click="setDarkView"
    >
      <PokemonMusic />
    </div>
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

@media (min-width: 700px) {
  .pokedex-screen {
    top: 27.4%;
    left: 8.2%;
    height: 34%;
  }
}
</style>
