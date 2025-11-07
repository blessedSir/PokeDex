import { useEffect, useState } from "react";
import { getPokemons, getPokemonDetails } from "../api/pokemonApi";
import type { Pokemon, PokemonDetails } from "../types/Pokemon";
import { PokemonCard } from "../components/PokemonCard";
import { PokemonModal } from "../components/PokemonModal";
import { useMemo } from "react";

export function Pokedex() {
  const [allPokemons, setAllPokemons] = useState<PokemonDetails[]>([]);
  const [visible, setVisible] = useState<PokemonDetails[]>([]);
  const [selected, setSelected] = useState<PokemonDetails | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [type, setType] = useState<string>("");
  const perPage = 12;

  const types = [
    ...new Set(allPokemons.flatMap((p) => p.types.map((t) => t.type.name))),
  ];

  const filtered = useMemo(() => {
    return allPokemons.filter(
      (p) =>
        (!type || p.types.some((t) => t.type.name === type)) &&
        p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [allPokemons, type, search]);

  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);
      const data: Pokemon[] = await getPokemons(200); // можно увеличить до 1000
      const details = await Promise.all(
        data.map((p) => getPokemonDetails(p.url))
      );
      setAllPokemons(details);
      setLoading(false);
    };
    loadAll();
  }, []);

  useEffect(() => {
    const start = 0;
    const end = page * perPage;
    setVisible(filtered.slice(start, end));
  }, [filtered, page]);

  return (
    <div className="flex flex-col justify-center min-h-screen bg-gray-100 p-6 font-montserrat">
      <h1 className="text-3xl font-bold text-center mb-6">PokéDex</h1>

      <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
        <input
          type="text"
          placeholder="🔍 Search Pokémon..."
          className="border w-full rounded-lg p-2 bg-sky-50 text-center sm:w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex items-center gap-3 p-2 bg-sky-50 rounded-lg outline-1">
          <span className="font-medium">Type</span>
          <select
            className="outline-none bg-transparent capitalize"
            onChange={(e) => setType(e.target.value)}
          >
            <option className="capitalize" value="">
              All
            </option>
            {types.map((t) => (
              <option className="capitalize" key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {loading
          ? Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="bg-gray-200 animate-pulse rounded-xl h-40"
              />
            ))
          : visible.map((p) => (
              <PokemonCard
                key={p.id}
                pokemon={p}
                onClick={() => setSelected(p)}
              />
            ))}
      </div>

      {selected && (
        <PokemonModal pokemon={selected} onClose={() => setSelected(null)} />
      )}

      <div className="flex justify-center items-center gap-4 mt-6">
        {!loading && visible.length < filtered.length && (
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="mt-6 mx-auto px-6 py-2 bg-sky-700 text-white rounded-xl font-semibold hover:bg-sky-800 transition"
          >
            Load more
          </button>
        )}
      </div>
    </div>
  );
}
