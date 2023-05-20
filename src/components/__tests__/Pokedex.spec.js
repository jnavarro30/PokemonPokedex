import { describe, it, expect, vi } from "vitest";
import { shallowMount, mount } from "@vue/test-utils";
import Pokedex from "../Pokedex.vue";
import store from "../../store";
import PokemonData from "../PokemonData.vue";
import PokemonMusic from "../PokemonMusic.vue";

describe("Pokedex", () => {
  const wrapper = mount(Pokedex, {
    global: {
      plugins: [store],
      // alternative
      // mocks: {
      //   $store: store,
      // },
    },
  });

  it("renders properly", () => {
    expect(wrapper.vm).toBeTruthy();
    expect(wrapper.find(".pokedex").exists()).toBe(true);
  });

  it("renders data component properly", () => {
    let pokemonData = wrapper.findComponent(PokemonData);
    expect(pokemonData.exists()).toBe(true);
  });

  it("pokemonView toggles to dark view", async () => {
    await wrapper.find(".pokedex-screen").trigger("click");
    expect(wrapper.find(".dark-view").exists()).toBe(true);
  });
});

describe("Buttons red, blue, orange, green", () => {
  const wrapper = shallowMount(Pokedex, {
    global: {
      plugins: [store],
      // alternative
      // mocks: {
      //   $store: store,
      // },
    },
  });

  it("toggles music screen properly (orange)", async () => {
    await wrapper.find(".orange-btn").trigger("click");
    let pokemonMusic = wrapper.findComponent(PokemonMusic);
    expect(pokemonMusic.exists()).toBe(true);
  });

  it("toggles classicView (green)", async () => {
    expect(wrapper.vm.classicView).toBe(false);
    await wrapper.find(".green-btn").trigger("click");
    expect(wrapper.vm.classicView).toBe(true);
  });

  // it("sets pokemonParam to userinput", async () => {
  //   await wrapper.find(".input-btn").setValue("abra");
  //   let val = await wrapper.find(".input-btn").value;
  //   console.log("value", val);
  //   await wrapper.find(".blue-btn").trigger("click");
  //   expect(wrapper.vm.pokemonParam).toBe("abra");
  // });

  it("resets state to default (red)", async () => {
    let pokemonMusic = wrapper.findComponent(PokemonMusic);
    await wrapper.find(".red-btn").trigger("click");
    expect(pokemonMusic.exists()).toBe(false);
  });
});

describe("Pokedex D-Pad", () => {
  const wrapper = shallowMount(Pokedex, {
    global: {
      plugins: [store],
      // alternative
      // mocks: {
      //   $store: store,
      // },
    },
  });

  it("pokemonParam increased by up & left buttons", async () => {
    await wrapper.find(".up-btn").trigger("click");
    await wrapper.find(".right-btn").trigger("click");
    expect(wrapper.vm.pokemonParam).toBe(3);
  });

  it("pokemonParam decreased by bottom & left buttons", async () => {
    console.log(wrapper.vm.pokemonParam);
    await wrapper.find(".bottom-btn").trigger("click");
    await wrapper.find(".left-btn").trigger("click");
    expect(wrapper.vm.pokemonParam).toBe(1);
  });
});
