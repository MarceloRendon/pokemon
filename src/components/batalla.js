import { useState } from "react";
import axios from "axios";

// Relación de efectividad de tipos (simplificada)
const typeEffectiveness = {
  fire: { strongAgainst: ["grass"], weakAgainst: ["water"] },
  water: { strongAgainst: ["fire"], weakAgainst: ["electric", "grass"] },
  grass: { strongAgainst: ["water"], weakAgainst: ["fire"] },
  electric: { strongAgainst: ["water"], weakAgainst: ["ground"] },
  // Agrega más tipos según sea necesario
};

function Batalla() {
  const [pokemonOne, setPokemonOne] = useState(null);
  const [pokemonTwo, setPokemonTwo] = useState(null);
  const [searchOne, setSearchOne] = useState("");
  const [searchTwo, setSearchTwo] = useState("");
  const [winner, setWinner] = useState("");

  const fetchPokemon = (pokemonName, setPokemon) => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`;
    axios
      .get(URL)
      .then((response) => {
        const pokemonData = {
          name: response.data.name,
          id: response.data.id,
          img: response.data.sprites.other.dream_world.front_default,
          types: response.data.types.map((typeInfo) => typeInfo.type.name),
        };
        setPokemon(pokemonData);
      })
      .catch((err) => {
        window.alert("Pokémon no encontrado");
      });
  };

  const handleBattle = () => {
    if (pokemonOne && pokemonTwo) {
      const typeOne = pokemonOne.types[0]; // Primer tipo del Pokémon 1
      const typeTwo = pokemonTwo.types[0]; // Primer tipo del Pokémon 2

      if (typeEffectiveness[typeOne]?.strongAgainst.includes(typeTwo)) {
        setWinner(`${pokemonOne.name} gana!`);
      } else if (typeEffectiveness[typeTwo]?.strongAgainst.includes(typeOne)) {
        setWinner(`${pokemonTwo.name} gana!`);
      } else {
        setWinner("¡Es un empate!");
      }
    } else {
      window.alert("Selecciona dos Pokémon para batallar.");
    }
  };

  return (
    <div className="battle-section">
      <div className="battle-container">
        {/* Sección para seleccionar el Pokémon 1 */}
        <div className="pokemon-battle">
          <h3>Pokémon 1</h3>
          <input
            type="text"
            value={searchOne}
            onChange={(e) => setSearchOne(e.target.value)}
            placeholder="Ingresa el nombre del Pokémon 1"
          />
          <button onClick={() => fetchPokemon(searchOne, setPokemonOne)}>
            Buscar Pokémon 1
          </button>

          {pokemonOne && (
            <div className="pokemon-card">
              <h2>{pokemonOne.name}</h2>
              <h3>ID: # {pokemonOne.id}</h3>
              <img src={pokemonOne.img} alt="imagen del pokémon" />
              <p>Tipo(s): {pokemonOne.types.join(", ")}</p>
            </div>
          )}
        </div>

        {/* Sección para seleccionar el Pokémon 2 */}
        <div className="pokemon-battle">
          <h3>Pokémon 2</h3>
          <input
            type="text"
            value={searchTwo}
            onChange={(e) => setSearchTwo(e.target.value)}
            placeholder="Ingresa el nombre del Pokémon 2"
          />
          <button onClick={() => fetchPokemon(searchTwo, setPokemonTwo)}>
            Buscar Pokémon 2
          </button>

          {pokemonTwo && (
            <div className="pokemon-card">
              <h2>{pokemonTwo.name}</h2>
              <h3>ID: # {pokemonTwo.id}</h3>
              <img src={pokemonTwo.img} alt="imagen del pokémon" />
              <p>Tipo(s): {pokemonTwo.types.join(", ")}</p>
            </div>
          )}
        </div>
      </div>

      {/* Botón para iniciar la batalla debajo de ambos Pokémon */}
      <button className="battle-button" onClick={handleBattle}>
        ¡Batalla!
      </button>

      {/* Mostrar el resultado de la batalla */}
      {winner && <h2 className="battle-result">{winner}</h2>}
    </div>
  );
}

export default Batalla;
