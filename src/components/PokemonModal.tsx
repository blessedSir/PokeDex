// components/PokemonModal.tsx
import type { PokemonDetails } from "../types/Pokemon";

type Props = {
  pokemon: PokemonDetails;
  onClose: () => void;
};

export function PokemonModal({ pokemon, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 relative w-80 shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          ✖
        </button>

        <img
          src={pokemon.sprites.other.dream_world.front_default}
          alt={pokemon.name}
          className="w-32 h-32 mx-auto"
        />
        <h2 className="text-2xl font-semibold text-center mt-2 capitalize">
          {pokemon.name}
        </h2>

        <div className="mt-4 capitalize">
          <p>
            <strong>Height:</strong> {pokemon.height}
          </p>
          <p>
            <strong>Weight:</strong> {pokemon.weight}
          </p>
          <p>
            <strong>Type:</strong>{" "}
            {pokemon.types.map((t) => t.type.name).join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
}
