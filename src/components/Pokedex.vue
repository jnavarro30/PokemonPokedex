<script>
import axios from "axios";
import PokemonData from "./PokemonData.vue";
import PokemonMusic from "./PokemonMusic.vue";

export default {
  components: {
    PokemonData,
    PokemonMusic,
  },
  computed: {
    pokemonView() {
      return this.$store.state.pokemonView;
    },
    pokemonParam() {
      return this.$store.state.pokemonParam;
    },
    pokemonInfo() {
      return this.$store.state.pokemonInfo;
    },
    classicView() {
      return this.$store.state.classicView;
    },
    darkView() {
      return this.$store.state.darkView;
    },
  },
  methods: {
    setPokemonView() {
      this.$store.commit("setPokemonView");
    },
    setPokemonParam(param) {
      this.$store.dispatch("setPokemonParam", param);
      this.fetchPokemon();
    },
    setPokemonInfo(info) {
      this.$store.dispatch("setPokemonInfo", info);
    },
    setClassicView() {
      this.$store.commit("setClassicView");
    },
    setDarkView() {
      this.$store.commit("setDarkView");
    },
    redBtn() {
      this.$store.commit("redBtn");
    },
    async fetchPokemon() {
      try {
        let body = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${this.$store.state.pokemonParam}`
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
        console.error(err);
        return;
      }
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
      v-if="pokemonView === true"
      class="pokedex-screen"
      :class="darkView ? 'dark-view' : ''"
      @click="setDarkView"
    >
      <PokemonData />
    </div>
    <div
      v-else
      class="music-screen"
      :class="darkView ? 'dark-view' : ''"
      @click="setDarkView"
    >
      <PokemonMusic />
    </div>
    <div
      className="up-btn btn"
      @click="setPokemonParam(pokemonParam + 1)"
    ></div>
    <div
      className="right-btn btn"
      @click="setPokemonParam(pokemonParam + 1)"
    ></div>
    <div
      className="bottom-btn btn"
      @click="setPokemonParam(pokemonParam - 1)"
    ></div>
    <div
      className="left-btn btn"
      @click="setPokemonParam(pokemonParam - 1)"
    ></div>
    <div className="red-btn btn" @click="redBtn"></div>
    <div className="blue-btn btn" @click="blueBtn"></div>
    <div className="green-btn btn" @click="setClassicView"></div>
    <div class="orange-btn btn" @click="setPokemonView"></div>
    <div className="speaker-btn btn" @click="speakerBtn"></div>
    <input
      className="input-btn btn"
      type="text"
      name="input"
      value="{userInput}"
      placeholder="Name/ID"
      onChange="{handleOnChange}"
      autoComplete="off"
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
  border: 1px solid red;
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

.music-screen {
  transform: translate(10%, 80%);
  height: 35%;
  width: 83%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  border-radius: 10px;
  padding: 0.5rem;
}

.dark-view {
  background-color: black;
  color: #ffffff;
}
/* CONTROLS */
.btn {
  position: absolute;
  z-index: 100;
  background: black;
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
}

@media (max-width: 380px) {
  .pokedex-screen {
    transform: translate(11%, 81.5%);
    height: 31.5%;
  }
  .input-btn {
    background: transparent;
    height: 10%;
    width: 36%;
    transform: translate(52%, 465%);
  }
}
</style>
