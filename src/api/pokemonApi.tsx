import axios from "axios";

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});

export const getPokemons = async (limit = 12, offset = 0) => {
  const { data } = await api.get(`pokemon?limit=${limit}&offset=${offset}`);
  return data.results;
};

export const getPokemonDetails = async (url: string) => {
  const { data } = await axios.get(url);
  return data;
};
