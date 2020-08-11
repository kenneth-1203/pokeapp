import React, { Component } from "react";
import axios from 'axios';

import Navbar from '../layout/Navbar';


export default class PokemonPage extends Component {
  state = {
    name: '',
    pokemonIndex: '',
    imageUrl: ''
  }

  async componentDidMount() {
    const { pokemonIndex } = this.props.match.params;

    // URLs
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
    const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;

    // Pokemon information
    const pokemonRes = await axios.get(pokemonUrl);

    const name = pokemonRes.data.name;
    const imageUrl = pokemonRes.data.sprites.front_default;
  }

  render() {
    return (
      <div className="container">
        <div className="dashboard">
          <Navbar />
          <h1>{this.state.name}</h1>
        </div>
      </div>
    )
  }
}
