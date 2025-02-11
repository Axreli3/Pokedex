import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import '../styles/Pokedex.css'
import { FaHeart, FaBolt, FaShieldAlt, FaTachometerAlt } from 'react-icons/fa';
import { GiGladius } from "react-icons/gi";


function PokemonCard({ url }) {
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    axios.get(url).then(({ data }) => setPokemon(data));
  }, [url]);

  if (!pokemon) return <p>cargando...</p>;

  const types = pokemon?.types?.map(t => t.type.name)

  const [hp, attack, defense, , , speed] = pokemon?.stats || []

  return (
    <Link to={`/pokedex/${pokemon.name}`} className={`border-black border-4 rounded-xl pokecard_type--${types?.[0]}`}>
    <div
      className="bg-no-repeat bg-cover bg-top h-75 w-60 relative"
      style={{
        backgroundImage: `url(${pokemon?.sprites?.other["official-artwork"]?.front_default})`,
        backgroundSize: 'contain',
      }}
    >
      <div className="flex justify-center items-end pt-61">
        <h2 className="font-bold text-xl text-black overline">{pokemon.name}</h2>
      </div>
      <div className="flex font-semibold justify-center items-center mt-4">
        <p className="absolute text-center">
          {types?.length > 1 ? types.join(', ') : types?.[0]}
        </p>
      </div>
  
      <div className="heard">
        <FaHeart className="black"/> <p className="black">: <span>{hp?.base_stat}</span></p>
      </div>
  
      <div className="attack">
        <GiGladius className="black" /> <p className="black">: <span>{attack?.base_stat}</span></p>
      </div>

      <div className="defense">
        <FaShieldAlt className="black" /> <p className="black">: <span>{defense?.base_stat}</span></p>
      </div>
  
      <div className="speed">
        <FaTachometerAlt className="black" /> <p className="black">: <span >{speed?.base_stat}</span></p>
      </div>
    </div>
  </Link>
  );
}

export default PokemonCard;
