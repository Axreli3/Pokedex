import React, { useRef } from 'react'
import { useName } from '../../hooks/useName'
import { useNavigate } from 'react-router'
import PokemonImg from './styles/International_Pokémon_logo.svg.png'

function Home() {
  const inputReft = useRef()
  const { setName } = useName()
  const navigate = useNavigate()

const handleSetName = () => {
  if(!inputReft.current.value) return
  setName(inputReft.current.value)
  navigate('/pokedex')
}

  return (
    <div className="flex flex-col  justify-center items-center bg-gradient-to-r  to-red-500 min-h-screen p-6">
    <img className='flex ' src={PokemonImg} alt="Pokemon" />
  <h1 className="text-6xl font-bold text-black mb-4">POKEDEX</h1>
  <h2 className="text-4xl font-semibold text-black mb-2">¡Hola Entrenador!</h2>
  <p className="text-xl text-black font-semibold mb-6 text-center">
    Para poder comenzar, dame tu nombre
  </p>

  <div className="flex items-center bg-white p-3 rounded-xl shadow-lg mb-4 w-full max-w-sm">
    <input
      type="text"
      ref={inputReft}
      className="w-full p-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Tu nombre..."
    />
  </div>

  <button
    onClick={handleSetName}
    className="bg-red-400 text-black font-bold py-2 px-6 rounded-full shadow-md hover:bg-yellow-500 transition duration-300 ease-in-out mb-30"
  >
    Comenzar
  </button>
</div>
  )
}

export default Home