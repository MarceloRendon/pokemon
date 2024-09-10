// import { useEffect, useState } from "react";
// import "./App.css";
// import axios from "axios";

// function App() {
//   const [data, setData] = useState();
//   const [name, setName] = useState();
//   const [id, setId] = useState();
//   const [img, setImg] = useState();
//   const [searchName, setSearchName] = useState(""); // Nombre del Pokémon para buscar
//   const [tipo, setTipo] = useState([]); // Inicializamos tipo como un arreglo vacío

//   const fetchPokemon = (pokemonName) => {
//     const URL = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`;
//     axios
//       .get(URL)
//       .then((response) => {
//         setData(response.data); //set de la data
//         setName(response.data.name); //set del nombre
//         setId(response.data.id); // set del ID
//         setImg(response.data.sprites.other.dream_world.front_default); //set del sprite
//         setTipo(response.data.types.map((typeInfo) => typeInfo.type.name)); // Obtener los tipos
//       })
//       .catch((err) => {
//         window.alert("Pokémon no encontrado");
//       });
//   };

//   //Función de búsqueda

//   const handleSearch = () => {
//     if (searchName.trim() !== "") {
//       fetchPokemon(searchName);
//     } else {
//       window.alert("Por favor, ingresa un nombre válido");
//     }
//   };

//   return (
//     <div className="App">
//       <h1>Pokémon Estación de Batalla</h1>

//       <input
//         type="text"
//         value={searchName}
//         onChange={(e) => setSearchName(e.target.value)}
//         placeholder="Ingresa el nombre o el ID del Pokémon"
//       />
//       <button onClick={handleSearch}>Buscar Pokémon</button>

//       {name && (
//         <>
//           <h2>{name}</h2>
//           <h3>ID: # {id}</h3>
//           <img src={img} alt="imagen del pokémon" />

//           <p>Tipo(s):</p>
//           {tipo.map((typeName, key) => (
//             <p key={key}>{typeName}</p>
//           ))}

//           <p>Habilidades:</p>
//           {data?.abilities.map((value, key) => (
//             <p key={key}>{value.ability.name}</p>
//           ))}
//         </>
//       )}
//     </div>
//   );
// }

// export default App;
import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Batalla from "./components/batalla";

function App() {
  const [data, setData] = useState();
  const [name, setName] = useState();
  const [id, setId] = useState();
  const [img, setImg] = useState();
  const [searchName, setSearchName] = useState(""); // Nombre o ID del Pokémon para buscar
  const [tipo, setTipo] = useState([]);
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);

  // Obtener la lista de los primeros 100 Pokémon (u otro número mayor para más resultados)
  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=100")
      .then((response) => {
        setPokemonList(response.data.results);
        setFilteredPokemonList(response.data.results); // Al principio, mostramos todos los Pokémon
      })
      .catch((err) => {
        window.alert("Error al obtener la lista de Pokémon");
      });
  }, []);

  // Filtrar la lista de Pokémon en base a lo que se escribe en el input
  useEffect(() => {
    setFilteredPokemonList(
      pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchName.toLowerCase())
      )
    );
  }, [searchName, pokemonList]);

  const fetchPokemon = (pokemonNameOrId) => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${pokemonNameOrId.toLowerCase()}`;
    axios
      .get(URL)
      .then((response) => {
        setData(response.data);
        setName(response.data.name);
        setId(response.data.id);
        setImg(response.data.sprites.other.dream_world.front_default);
        setTipo(response.data.types.map((typeInfo) => typeInfo.type.name)); // Obtener los tipos
      })
      .catch((err) => {
        window.alert("Pokémon no encontrado");
      });
  };

  const handleSearch = () => {
    if (searchName.trim() !== "") {
      fetchPokemon(searchName);
    } else {
      window.alert("Por favor, ingresa un nombre o ID válido");
    }
  };

  return (
    <div className="App">
      <h1>Pokémon Estación de Batalla</h1>
      <div className="container">
        {/* Lista de los primeros Pokémon (dinámica según el input) */}
        <div className="pokemon-list">
          <h3>Lista de Pokémon</h3>

          {/* Buscador de Pokémon */}
          <input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Ingresa el nombre o el ID del Pokémon"
          />
          <button onClick={handleSearch}>Buscar Pokémon</button>

          {/* Mostrar la lista filtrada de Pokémon con barra de desplazamiento */}
          <ul>
            {filteredPokemonList.map((pokemon, index) => (
              <li key={index} onClick={() => fetchPokemon(pokemon.name)}>
                {pokemon.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Detalles del Pokémon seleccionado */}
        {/* Detalles del Pokémon seleccionado */}
        <div className="pokemon-details">
          {name && (
            <div className="pokemon-card">
              <h2>{name}</h2>
              <h3>ID: # {id}</h3>
              <img src={img} alt="imagen del pokémon" />

              <h4>Tipo(s):</h4>
              {tipo.map((typeName, key) => (
                <p key={key}>{typeName}</p>
              ))}

              <h4>Habilidades:</h4>
              {data?.abilities.map((value, key) => (
                <p key={key}>{value.ability.name}</p>
              ))}
            </div>
          )}
        </div>
      </div>

      <Batalla></Batalla>
    </div>
  );
}

export default App;
