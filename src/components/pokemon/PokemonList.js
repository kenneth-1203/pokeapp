import React, { Component } from "react";
import PokemonCard from "./PokemonCard";
import axios from "axios";

export default class PokemonList extends Component {
  state = {
    url: "https://pokeapi.co/api/v2/pokemon/",
    pokemon: [],
  };

  async componentDidMount() {
    const res = await axios.get(this.state.url);
    this.setState({ pokemon: res.data.results });

    console.log(this.state);
  }

  render() {
    return (
      <div className="container pokemon-list">
        {this.state.pokemon ? (
          <div className="d-flex flex-wrap justify-content-center text-center">
            {this.state.pokemon.map((pokemon) => (
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
