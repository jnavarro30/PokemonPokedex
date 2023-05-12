<script>
import axios from "axios";
import PokemonData from "./PokemonData.vue";
import PokemonMusic from "./PokemonMusic.vue";
import { mapGetters, mapActions } from "vuex";

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
    async fetchPokemon() {
      try {
        let param = this.$store.getters.userInput
          ? this.$store.getters.userInput
          : this.$store.getters.pokemonParam;
        let body = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${param}`
        );

        let pokemon = body.data;
        let { id, name } = pokemon;
        let classicSprite = pokemon.sprites.front_default;
        let sprite = pokemon.sprites.other.dream_world.front_default;

        this.setPokemonInfo({
          id,
          name,
          classicSprite,
          sprite,
        });
      } catch (err) {
        alert(`Invalid Entry: ${this.$store.getters.userInput}`);
        console.error(err);
      }
    },
    blueBtn() {
      this.fetchPokemon();
      this.setUserInput("");
    },
  },
  watch: {
    pokemonParam() {
      this.fetchPokemon();
    },
  },
  mounted() {
    this.fetchPokemon();
  },
};
</script>

<template>
  <div class="pokedex" tabIndex="1" @keydown="handleOnKeyDown">
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
  border: 1px solid black;
  transform: translate(11%, 82.5%);
  height: 32%;
  width: 76.6%;
  background-color: rgba(37, 169, 245, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 10px;
}
.dark-view {
  background-color: black;
  color: #ffffff;
}
/* CONTROLS */
.btn {
  position: absolute;
  /* background: black; show/hide buttons */
}

.up-btn {
  height: 8%;
  width: 12%;
  transform: translate(620%, 520%);
}
.bottom-btn {
  height: 8%;
  width: 12%;
  transform: translate(620%, 630%);
}

.right-btn {
  height: 7%;
  width: 12%;
  transform: translate(700%, 670%);
}
.left-btn {
  height: 7%;
  width: 12%;
  transform: translate(540%, 670%);
}

.red-btn {
  height: 5%;
  width: 10%;
  transform: translate(195%, 605%);
}

.blue-btn {
  height: 8%;
  width: 15%;
  transform: translate(30%, 495%);
}

.green-btn {
  height: 4%;
  width: 18%;
  transform: translate(125%, 1040%);
}

.orange-btn {
  height: 4%;
  width: 18%;
  transform: translate(245%, 1040%);
}

.speaker-btn {
  height: 7%;
  width: 25%;
  transform: translate(240%, 415%);
}

.input-btn {
  background: transparent;
  height: 10%;
  width: 36%;
  transform: translate(52%, 480%);
  font-size: 1.1rem;
}

@media (max-width: 380px) {
  .pokedex-screen {
    transform: translate(11%, 81.5%);
    height: 31.5%;
  }
  .input-btn {
    transform: translate(52%, 465%);
  }
}
</style>
