import { createStore } from "vuex";
import tracks from "../assets/audio/tracks";

const store = createStore({
  state: {
    pokemonView: true,
    pokemonParam: 1,
    pokemonInfo: {},
    currentTrack: "Celadon City",
    currentTrackIndex: 0,
    classicView: false,
    darkView: false,
  },

  getters: {
    pokemonTracks() {
      return tracks;
    },
  },

  mutations: {
    setPokemonView(state) {
      state.pokemonView = !state.pokemonView;
    },
    setPokemonParam(state, payload) {
      state.pokemonParam = payload;
    },
    setPokemonInfo(state, payload) {
      state.pokemonInfo = payload;
    },
    setCurrentTrackIndex(state, payload) {
      state.currentTrackIndex = payload;
      console.log(state.currentTrackIndex);
    },
    setClassicView(state) {
      state.classicView = !state.classicView;
    },
    setDarkView(state) {
      state.darkView = !state.darkView;
    },
    redBtn(state) {
      state.pokemonView = true;
      state.pokemonParam = 1;
      state.pokemonInfo = {
        classicSprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg",
        id: 1,
        name: "bulbasaur",
      };
      state.classicView = false;
      state.darkView = false;
    },
  },
  actions: {
    setPokemonParam(context, payload) {
      console.log(payload, " is the payload");
      console.log(context.state.pokemonParam);
      if (payload < 1) context.commit("setPokemonParam", 1);
      else context.commit("setPokemonParam", payload);
    },
    setPokemonInfo(context, payload) {
      context.commit("setPokemonInfo", payload);
    },
    setCurrentTrackIndex(context, payload) {
      if (payload < -9) context.commit("setCurrentTrackIndex", 0);
      else if (payload > 0) context.commit("setCurrentTrackIndex", -9);
      else context.commit("setCurrentTrackIndex", payload);
    },
  },
});

export default store;
