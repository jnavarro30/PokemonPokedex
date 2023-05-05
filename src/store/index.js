import { createStore } from "vuex";

const store = createStore({
  state: {
    pokemonView: true,
    pokemonParam: 1,
    pokemonInfo: {},
    classicView: false,
    darkView: false,
  },

  getters: {
    something() {
      return "some";
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
  },
});

export default store;
