import React, { Component } from "react";

import PokemonCard from "./PokemonCard";



export default class PokemonList extends Component {
  state = {
    url: "https://pokeapi.co/api/v2/pokemon/",
  };

  render() {
    return (
      <div className="container pokemon-list">
        {this.props.pokemon ? (
          <div className="d-flex flex-wrap justify-content-center text-center">
            {this.props.pokemon.map((pokemon) => (
              <PokemonCard 
                key={pokemon.name}
                name={pokemon.name} 
                url={pokemon.url} 
              />
            ))}
          </div>
        ) : (
          <h3>Loading Pokemon...</h3>
        )}
      </div>
    );
  }
}
