import React, { useEffect, useState } from 'react';
import './index.css';
import Header from './components/Header';
import PokemonCard from './components/PokemonCard';
import Filters from './components/Filters';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');

  // Delay utility to throttle requests
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  // Throttled fetching of Pokémon details
  const fetchAllPokemon = async () => {
    try {
      // Fetch list of first 150 Pokémon with names and URLs
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
      const data = await response.json();
  
      // Extract URLs for each Pokémon and fetch them in parallel
      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          return await res.json();
        })
      );
  
      return pokemonDetails;
    } catch (error) {
      console.error('Failed to fetch Pokémon list:', error);
      return [];
    }
  };
  
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const data = await fetchAllPokemon();
        setPokemons(data);
        setFiltered(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPokemons();
  }, []);
  

  useEffect(() => {
    const filteredList = pokemons.filter((p) => {
      const matchName = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchType = selectedType
        ? p.types.some((t) => t.type.name === selectedType)
        : true;
      return matchName && matchType;
    });
    setFiltered(filteredList);
  }, [searchTerm, selectedType, pokemons]);

  return (
    <div className="App">
      <Header />
      <Filters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        allPokemonNames={pokemons.map((p) => p.name)}
      />
      {loading ? (
        <p className="status">Loading...</p>
      ) : filtered.length === 0 ? (
        <p className="status">No Pokémon found.</p>
      ) : (
        <div className="pokemon-grid">
          {filtered.map((p) => (
            <PokemonCard key={p.id} pokemon={p} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
