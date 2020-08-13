import React, { Component } from "react";
import axios from "axios";

import Navbar from "../layout/Navbar";

export default class PokemonPage extends Component {
  state = {
    name: "",
    pokemonIndex: "",
    imageUrl: "",
    types: [],
    description: '',
    stats: {
      hp: '',
      attack: '',
      defense: '',
      speed: '',
      specialAtk: '',
      specialDef: ''
    },
    height: '',
    weight: '',
    eggGroup: '',
    abilities: '',
    genderRatioMale: '',
    genderRatioFemale: '',
    evs: '',
    hatchSteps: ''
  };

  async componentDidMount() {
    const { pokemonIndex } = this.props.match.params;

    // URLs
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
    const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;

    // Pokemon information
    const pokemonRes = await axios.get(pokemonUrl);

    const name = pokemonRes.data.name;
    const imageUrl = pokemonRes.data.sprites.front_default;

    let { hp, attack, defense, speed, specialAtk, specialDef } = '';

    pokemonRes.data.stats.map(stat => {
      switch(stat.stat.name) {

        case 'hp': {
          hp = stat.base_stat;
          break;
        } 
        case 'attack': {
          attack = stat.base_stat;
          break;
        } 
        case 'defense': {
          defense = stat.base_stat;
          break;
        }
        case 'speed': {
          speed = stat.base_stat;
          break;
        }
        case 'special-attack': {
          specialAtk = stat.base_stat;
          break;
        }
        case 'speical-defense': {
          specialDef = stat.base_stat;
          break;
        }
        default: return null;
      }
    })

    // Pokemon Stats

    const height = Math.round((pokemonRes.data.height / 10) * 100) / 100;
    
    const weight = Math.round((pokemonRes.data.weight / 10) * 100) / 100;
    
    const types = pokemonRes.data.types.map(type => type.type.name);

    const abilities = pokemonRes.data.abilities.map(ability => {
      
      // Text formatting
      ability.ability.name.toLowerCase().split('').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join('');
    })

    const evs = pokemonRes.data.stats.filter(stat => {
      if (stat.effort > 0) {
        return true;
      }
      return false;

    }).map(stat => {

      // Text formatting
      return `${stat.effort} ${stat.stat.name}`.toLowerCase().split('').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join('');
    }).join(', ');

    // Get Pokemon Description, Catch Rate, EggGroups, Gender Ratio, Hatch Steps
    await axios.get(pokemonSpeciesUrl).then(res => {
      let description;
      
      res.data.flavor_text_entries.some(flavor => {
        if (flavor.language.name === "en") {
          description = flavor.flavor_text;
        }
      })
    })
  }

  render() {
    return (
      <div className="container">
        <div className="dashboard">
          <Navbar />
          <div className="container">
            <div className="row pokemon-index">
              <div className="col-sm-4">img</div>
              <div className="col-sm-4"></div>
              <div className="col-sm-4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
