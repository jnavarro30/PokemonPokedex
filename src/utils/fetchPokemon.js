import axios from "axios";
import store from "../store/index";

export const fetchPokemon = async () => {
  try {
    let param = store.getters.userInput
      ? store.getters.userInput
      : store.getters.pokemonParam;
    let body = await axios.get(`https://pokeapi.co/api/v2/pokemon/${param}`);

    let pokemon = body.data;
    let { id, name } = pokemon;
    let classicSprite = pokemon.sprites.front_default;
    let sprite = pokemon.sprites.other.dream_world.front_default;

    if (param !== store.getters.pokemonParam)
      store.dispatch("setPokemonParam", id);

    store.dispatch("setPokemonInfo", {
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
