import { useState } from "react";
import type { PokemonDetails } from "../types/Pokemon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { typeEmoji } from "../utilities/pokeType";

interface Props {
  pokemon: PokemonDetails;
  onClick: () => void;
}

export function PokemonCard({ pokemon, onClick }: Props) {
  const [favorites, setFavorites] = useState<number[]>(() => {
    return JSON.parse(localStorage.getItem("favorites") || "[]");
  });

  const toggleFavorite = (id: number) => {
    const updated = favorites.includes(id)
      ? favorites.filter((f) => f !== id)
      : [...favorites, id];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };
  return (
    <div
      onClick={onClick}
      className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
    >
      <img
        src={pokemon.sprites.other.dream_world.front_default}
        alt={pokemon.name}
        className="w-30 h-30 relative z-10 drop-shadow-[0_4px_6px_rgba(0,0,0,0.25)]"
      />
      <div className="w-30 h-1 bg-black/50 rounded-full blur-sm" />

      <div className="flex justify-center items-start w-full gap-1 max-sm:flex-col">
        <div className="flex flex-col items-center justify-center max-sm:self-center ">
          <p className="capitalize mt-2 font-medium max-sm:self-center">
            {pokemon.name}
          </p>
          <span className="text-sm text-gray-500 capitalize">
            {typeEmoji[pokemon.types[0].type.name]}
            {pokemon.types[0].type.name}
          </span>
        </div>
        <button
          className="p-1  h-15 cursor-pointer max-sm:self-center"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(pokemon.id);
          }}
        >
          {favorites.includes(pokemon.id) ? (
            <FontAwesomeIcon
              icon={fasHeart}
              className="text-2xl text-red-800"
            />
          ) : (
            <FontAwesomeIcon
              icon={farHeart}
              className="text-2xl text-red-800"
            />
          )}
        </button>
      </div>
    </div>
  );
}
