import { useEffect, useState } from "react";
import axios from "axios";
import { useName } from "../../hooks/useName";
import PokemonList from "./components/PokemonList";
import pokeballImage from "./styles/file-pokeball-png-0.png";

const POKEAPI_BASE = "https://pokeapi.co/api/v2";

function Pokedex() {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [types, setTypes] = useState([]);
  const [pokeNum, setPokeNum] = useState(50);
  const [tempInputValue, setTempInputValue] = useState(pokeNum);

  const { name, clearName } = useName();

  const getInitialPokemons = () => {
    axios.get(`${POKEAPI_BASE}/pokemon?limit=${pokeNum}`).then(({ data }) => {
      setPokemons(data.results);
      setFilteredPokemons(data.results);
    });
  };

  useEffect(() => {
    getInitialPokemons(); 
  }, [pokeNum]); 
  useEffect(() => {
    axios
      .get(`${POKEAPI_BASE}/type?limit=18`)
      .then(({ data }) => setTypes(data.results));
  }, []);

  useEffect(() => {
    if (!search) {
      setFilteredPokemons(pokemons);
      return;
    }
    setFilteredPokemons(
      pokemons.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, pokemons]);

  useEffect(() => {
    if (selectedType === "all") {
      getInitialPokemons();
      return;
    }
    axios.get(`${POKEAPI_BASE}/type/${selectedType}`).then(({ data }) => {
      const typePokemons = data.pokemon.map((p) => p.pokemon);
      setPokemons(typePokemons);
      setFilteredPokemons(typePokemons);
    });
  }, [selectedType]);

  const handleInputChange = (event) => {
    const num = Math.max(1, parseInt(event.target.value)); 
    setTempInputValue(num);
  };

  const handleSetPokeNum = () => {
    setPokeNum(tempInputValue);
  };

  return (
    <div className="bg-red-100">
      <div className="back pl-10 h-25 sticky top-0 w-full bg-white shadow-xl z-10 text-7xl pt-3">
        <h1 className="flex justify-center sm:justify-start">
          P
          <img
            className="inline-block mt-5 w-13 h-13"
            src={pokeballImage}
            alt="Pokeball"
          />
          kedex
        </h1>
      </div>
      <div className="max-w-6xl mx-auto bg-pink-200 min-h-screen">
        {name && (
          <div>
            <p className="ml-8 text-2xl font-semibold">
              Bienvenido {name}, aquí podrás encontrar a tu Pokémon favorito :3
            </p>
            <button
              className="ml-8 px-2 rounded-2xl bg-red-500 text-black font-semibold text-2xl cursor-pointer"
              onClick={clearName}
            >
              Exit
            </button>
          </div>
        )}

        <div className="flex justify-center items-center flex-col">
          <input
            className="rounded-lg border-2 border-black-4 flex max-w-xl font-bold focus:outline-none mb-4"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter By Name"
          />

          {selectedType === "all" && (
            <div className="flex gap-3 items-center ">
              <span className="font-bold">Max:</span>
              <input
                type="number"
                value={tempInputValue}
                onChange={handleInputChange}
                className="flex mt-2 rounded font-se focus:outline-none bg-blue-200 mb-2 "
                min="1"
                max={1324}
              />
              <button
                className=" text-white w-16 h-6 bg-black  rounded "
                onClick={handleSetPokeNum} 
              >Limitar
              </button>
                
            </div>
          )}
        </div>

        <div className="flex justify-center items-center p-4">
          <select
            className="w-full max-w-xs p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="all">All 1324 Pokemons</option>
            {types.map((type) => (
              <option key={type.name} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-center items-center">
          {filteredPokemons.length === 0 ? (
            <div className="text-center p-4">
              <p className="font-bold">No Pokémon found.</p>
            </div>
          ) : (
            <PokemonList pokemons={filteredPokemons} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Pokedex;
