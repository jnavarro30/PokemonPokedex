import { describe, it, expect, beforeAll } from "vitest";
import { shallowMount } from "@vue/test-utils";
import Pokedex from "../Pokedex.vue";
import store from "../../store";
import PokemonData from "../PokemonData.vue";
import PokemonMusic from "../PokemonMusic.vue";

describe("Pokedex", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallowMount(Pokedex, {
      global: {
        plugins: [store],
        // alternative
        // mocks: {
        //   $store: store,
        // },
      },
    });
  });

  it("renders properly", () => {
    expect(wrapper.vm).toBeTruthy();
    expect(wrapper.find(".pokedex").exists()).toBe(true);
  });

  it("renders data component properly", () => {
    let pokemonData = wrapper.findComponent(PokemonData);
    expect(pokemonData.exists()).toBe(true);
  });

  it("renders music screen properly", async () => {
    await wrapper.find(".orange-btn").trigger("click");
    let pokemonMusic = wrapper.findComponent(PokemonMusic);
    expect(pokemonMusic.exists()).toBe(true);
  });
});

describe("Testing Getters and Actions", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallowMount(Pokedex, {
      global: {
        plugins: [store],
        // alternative
        // mocks: {
        //   $store: store,
        // },
      },
    });
  });

  it("pokemonView toggles to dark view", async () => {
    await wrapper.find(".pokedex-screen").trigger("click");
    expect(wrapper.find(".dark-view").exists()).toBe(true);
  });

  it("pokemonParam increments on up and right control pad", async () => {
    let upBtn = wrapper.find(".up-btn");
    let rightBtn = wrapper.find(".right-btn");
    await upBtn.trigger("click");
    // await rightBtn.trigger("click");

    expect(wrapper.vm.pokemonParam).toBe(1);
  });
});
