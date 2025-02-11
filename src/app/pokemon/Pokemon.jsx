import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./styles/Pokemon.css";
import { GiDrippingSword, GiGladius, GiLightningShield } from "react-icons/gi";
import { FaHeart, FaShieldAlt, FaTachometerAlt } from 'react-icons/fa';

const POKEAPI_BASE = "https://pokeapi.co/api/v2";

function Pokemon() {
  const params = useParams();
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    if (params.name) {
      axios
        .get(`${POKEAPI_BASE}/pokemon/${params.name}`)
        .then(({ data }) => setPokemon(data));
    }
  }, [params]);

  const types = pokemon?.types?.map((t) => t.type.name);

  const ability = pokemon?.abilities?.map((a) => a.ability.name);

  const [hp, attack, defense, specialAttack, specialDefense, speed] =
    pokemon?.stats || [];

  return (
    <div className="bg-amber-100">
      <div
        className={`max-w-6xl mx-auto p-10 bg-white  shadow-lg pokecard_type--${types?.[0]}`}
      >
        <div className="flex justify-center mb-6">
          <img
            src={pokemon?.sprites?.other["official-artwork"]?.front_default}
            alt={pokemon.name}
          />
        </div>
        <div className="text-center mb-4">
          <h2 className="text-4xl font-bold overline text-gray-800">{pokemon.name}</h2>
        
        </div>
   
   <p className="pl-10 font-bold text-2xl">
    Characters:
    </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 m-5 p-4  bg-red-400 border-black border-4 shadow-xl">
          <div className="flex font-semibold text-lg text-gray-700">
            <p>Weight: {pokemon?.weight}</p>
          </div>

          <div className="flex font-semibold text-lg text-gray-700">
            <p>Height: {pokemon?.height}</p>
          </div>

          <div className="flex font-semibold text-lg text-gray-700">
            <p>Abilities: {ability?.join(", ")}</p>
          </div>
        </div>
        <p className="pl-10 font-bold text-2xl">
    Stats:
    </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 p-4 m-5 mb-6 border-black border-4 bg-amber-200 shadow-xl">
          <div className="flex text-lg text-gray-900">
            <p className="flex">
            <FaHeart className="text-3xl"/>
              <span className="font-semibold ml-1">{hp?.base_stat}</span>
            </p>
          </div>
          <div className="flex text-lg text-gray-700">
            <p className="flex items-center">
            <GiGladius className="text-3xl"/>
              <span className="font-semibold ml-1">{attack?.base_stat}</span>
            </p>
          </div>
          <div className="flex text-lg text-gray-700">
            <p className="flex">
            <FaShieldAlt className="text-3xl"/>
              <span className="font-semibold ml-1">{defense?.base_stat}</span>
            </p>
          </div>
          <div className="flex text-lg text-gray-700">
            <p className="flex">
            <GiDrippingSword className="text-3xl" />
              <span className="font-semibold ml-1">{specialAttack?.base_stat}</span>
            </p>
          </div>
          <div className="flex text-lg text-gray-700">
            <p className="flex">
            <GiLightningShield className="text-3xl"/>
              <span className="font-semibold ml-1">{specialDefense?.base_stat}</span>
            </p>
          </div>
          <div className="flex text-lg text-gray-700">
            <p className="flex">
            <FaTachometerAlt className="text-3xl"/>
              <span className="font-semibold ml-1">{speed?.base_stat}</span>
            </p>
          </div>

          <div className="flex font-semibold text-lg text-gray-700">
            <p>Types: {types?.join(", ")}</p>
          </div>
        </div>

        <div className="mb-6 ">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Moves:</h3>
          <div className=" font-semibold grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {pokemon?.moves?.map((m) => (
              <p key={m.move.name} className="text-lg">
                {m.move.name}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pokemon;
