import { createStore } from "vuex";
import tracks from "../assets/audio/tracks";

const store = createStore({
  state: {
    pokemonView: true,
    pokemonParam: 1,
    pokemonInfo: {},
    currentTrack: new Audio(tracks["Celadon City"]),
    currentTrackIndex: 0,
    isPlaying: false,
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
    setCurrentTrack(state, payload) {
      let trackNames = Object.keys(tracks);
      state.currentTrack = new Audio(tracks[trackNames[payload]]);
    },
    setCurrentTrackIndex(state, payload) {
      state.currentTrackIndex = payload;
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
      state.currentTrack.pause();
      state.currentTrack.src = tracks["Celadon City"];
      state.isPlaying = false;
      state.classicView = false;
      state.darkView = false;
    },
    blueBtn(state) {
      console.log("press enter for input");
    },
    speakerBtn(state) {
      let url = Object.values(tracks)[Math.abs(state.currentTrackIndex)];
      if (state.currentTrack.src === url) {
        if (state.isPlaying) {
          state.isPlaying = false;
          state.currentTrack.pause();
        } else {
          state.isPlaying = true;
          state.currentTrack.play();
        }
      } else {
        state.currentTrack.pause();
        state.currentTrack.src = url;
        state.currentTrack.play();
        state.isPlaying = true;
      }
    },
  },
  actions: {
    setPokemonParam(context, payload) {
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
