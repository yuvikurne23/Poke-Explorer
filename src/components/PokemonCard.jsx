import React from 'react';

const PokemonCard = ({ pokemon }) => (
  <div className="pokemon-card">
    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
    <h3>{pokemon.name}</h3>
    <p>ID: {pokemon.id}</p>
    <div className="types">
      {pokemon.types.map((t) => (
        <span key={t.type.name} className={`type ${t.type.name}`}>
          {t.type.name}
        </span>
      ))}
    </div>
  </div>
);

export default PokemonCard;
