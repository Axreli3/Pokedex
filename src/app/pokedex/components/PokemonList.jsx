import PokemonCard from "./PokemonCard"

function PokemonList({pokemons}) {
  return (
    <div className="flex justify-center">
    <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center p-5">
      {pokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.name}
          url={pokemon.url}
        />
      ))}
    </div>
  </div>
  );
}

export default PokemonList