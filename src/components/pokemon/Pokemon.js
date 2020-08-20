import React, { Component } from "react";
import axios from "axios";

import Navbar from "../layout/Navbar";



export default class Pokemon extends Component {
  state = {
    name: "",
    pokemonIndex: "",
    imageUrl: "",
    types: [],
    description: "",
    stats: {
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      specialAtk: "",
      specialDef: "",
    },
    height: "",
    weight: "",
    eggGroups: "",
    abilities: "",
    genderRatioMale: "",
    genderRatioFemale: "",
    catchRate: "",
    evs: "",
    hatchSteps: "",
  };
  
  colorType = (type) => {
    let color;
    
    switch(type) {
      case 'grass': {
        color = '#86cf4c';
        break;
      }
      case 'fire': {
        color = '#ff5643';
        break;
      }
      case 'water': {
        color = '#56adff';
        break;
      }
      case 'poison': {
        color = '#a85c9f';
        break;
      }
      case 'electric': {
        color = '#fee83e';
        break;
      }
      case 'bug': {
        color = '#c2d21f';
        break;
      }
      case 'dark': {
        color = '#8e6956';
        break;
      }
      case 'dragon': {
        color = '#8975ff';
        break;
      }
      case 'flying': {
        color =  '#79a4ff';
        break;
      }
      case 'ghost': {
        color = '#7874d5';
        break;
      }
      case 'ground': {
        color = '#edcb55';
        break;
      }
      case 'psychic': {
        color = '#f461b0';
        break;
      }
      case 'ice': {
        color = '#96f1ff';
        break;
      }
      case 'rock': {
        color = '#cebd72';
        break; 
      }
      case 'steel': {
        color = '#c4c2db';
        break;
      }
      case 'fairy': {
        color = '#f9aeff';
        break;
      }
      case 'fighting': {
        color = '#c67955';
        break;
      }
      case 'normal': {
        color = '#bcbcac';
        break;
      }
      default: return null;
    }
    return color;
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

    let { hp, attack, defense, speed, specialAtk, specialDef } = "";

    pokemonRes.data.stats.map((stat) => {
      switch (stat.stat.name) {
        case "hp": {
          hp = stat.base_stat;
          break;
        }
        case "attack": {
          attack = stat.base_stat;
          break;
        }
        case "defense": {
          defense = stat.base_stat;
          break;
        }
        case "speed": {
          speed = stat.base_stat;
          break;
        }
        case "special-attack": {
          specialAtk = stat.base_stat;
          break;
        }
        case "special-defense": {
          specialDef = stat.base_stat;
          break;
        }
        default:
          return null;
      }
      return null;
    });

    // Pokemon Stats
    const height = Math.round((pokemonRes.data.height / 10) * 100) / 100; // metres
    const weight = Math.round((pokemonRes.data.weight / 10) * 100) / 100; // kilograms
    const types = pokemonRes.data.types.map((type) => type.type.name);
    const abilities = pokemonRes.data.abilities.map((ability) => {
      // Text formatting
      return ability.ability.name
        .toLowerCase()
        .split(" ")
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(" ");
    }).join(', ');

    // EVs
    const evs = pokemonRes.data.stats
      .filter((stat) => {
        if (stat.effort > 0) {
          return true;
        }
        return false;
      })
      .map((stat) => {
        // Text formatting
        return (
          `${stat.effort} ` +
          `${stat.stat.name}`
            .toLowerCase()
            .split("-")
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(" ")
        );
      })
      .join(", ");

    // Get Pokemon Description, Catch Rate, Egg Groups, Gender Ratio, Hatch Steps
    await axios.get(pokemonSpeciesUrl).then((res) => {
      let description;

      res.data.flavor_text_entries.some((flavor) => {
        if (flavor.language.name === "en") {
          description = flavor.flavor_text;
          // description = description.replace('\n', '')
        }
        return description;
      });

      // Gender Ratio
      const femaleRate = res.data.gender_rate;
      const genderRatioFemale = 12.5 * femaleRate;
      const genderRatioMale = 12.5 * (8 - femaleRate);

      // Catch Rate
      const catchRate = Math.round((100 / 255) * res.data.capture_rate);

      // Egg Groups
      const eggGroups = res.data.egg_groups
        .map((group) => {
          const str = group.name
            .toLowerCase()
            .split(" ")
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(" ");

          return str.replace(/[0-9]/g, '');
        })
        .join(", ")

      // Hatch Steps
      const hatchSteps = 255 * (res.data.hatch_counter + 1);

      // Setting state
      this.setState({
        description,
        eggGroups,
        genderRatioMale,
        genderRatioFemale,
        catchRate,
        hatchSteps,
      });

      this.setState({
        imageUrl,
        pokemonIndex,
        name,
        types,
        stats: {
          hp,
          attack,
          defense,
          speed,
          specialAtk,
          specialDef,
        },
        height,
        weight,
        abilities,
        evs,
      });
      console.log(this.state)
    });
  }
  render() {
    return (
      <div className="container">
        <div className="dashboard">
          <Navbar />
          <div className="container">
            <div className="pokemon-index">
              <div className="d-flex pokemon-info" style={{ background: `linear-gradient(to right, ${this.colorType(this.state.types[0])} 20%, white 100%)` }}>
                <h5 className="pokemon-id p-2">
                  {this.state.pokemonIndex}
                </h5>
                <h5 className="pokemon-name p-2">
                  {this.state.name
                    .toLowerCase()
                    .split(" ")
                    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                    .join(" ")}
                </h5>
                <div className="ml-auto p-2">
                  {this.state.types.map((type, i) => {
                    return (
                      <span
                        className={`badge badge-dark badge-pill mx-1 pb-1 pokemon-type--${type}`}
                        key={i}
                      >
                        {type.charAt(0).toUpperCase() + type.substring(1)}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="container row m-0 p-0">
                <div className="col-md-4 text-center">
                  <img src={this.state.imageUrl} height="200px" alt=""/>
                </div>
                <div className="col-md-8 pt-3">
                  <div className="row align-items-center">
                    <div className="col-12 col-md-3">HP</div>
                    <div className="col-12 col-md-9">
                      <div className="progress">
                        <div className="progress-bar bg-success" role="progressbar" style={{ width: `${this.state.stats.hp}%` }}>
                          <small>{this.state.stats.hp}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-12 col-md-3">Attack</div>
                    <div className="col-12 col-md-9">
                      <div className="progress">
                        <div className="progress-bar bg-danger" role="progressbar" style={{ width: `${this.state.stats.attack}%` }}>
                          <small>{this.state.stats.attack}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-12 col-md-3">SP Atk</div>
                    <div className="col-12 col-md-9">
                      <div className="progress">
                        <div className="progress-bar bg-danger" role="progressbar" style={{ width: `${this.state.stats.specialAtk}%` }}>
                          <small>{this.state.stats.specialAtk}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-12 col-md-3">Defense</div>
                    <div className="col-12 col-md-9">
                      <div className="progress">
                        <div className="progress-bar bg-info" role="progressbar" style={{ width: `${this.state.stats.defense}%` }}>
                          <small>{this.state.stats.defense}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-12 col-md-3">SP Def</div>
                    <div className="col-12 col-md-9">
                      <div className="progress">
                        <div className="progress-bar bg-info" role="progressbar" style={{ width: `${this.state.stats.specialDef}%` }}>
                          <small>{this.state.stats.specialDef}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-12 col-md-3">Speed</div>
                    <div className="col-12 col-md-9">
                      <div className="progress">
                        <div className="progress-bar bg-warning" role="progressbar" style={{ width: `${this.state.stats.speed}%` }}>
                          <small>{this.state.stats.speed}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="container row m-0">
                <p className="col-md-12 mb-1">
                  {this.state.description}
                </p>
              </div>
              <hr className="my-2"/>
              <h5 className="ml-4">Profile</h5>
              <div className="container row">
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-6">
                      <h6 className="float-right">Height:</h6>
                    </div>
                    <div className="col-6">
                      <h6 className="float-left">{this.state.height} m</h6>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-6">
                      <h6 className="float-right">Egg Groups:</h6>
                    </div>
                    <div className="col-6">
                      <h6 className="float-left">{this.state.eggGroups}</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container row">
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-6">
                      <h6 className="float-right">Weight:</h6>
                    </div>
                    <div className="col-6">
                      <h6 className="float-left">{this.state.weight} kg</h6>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-6">
                      <h6 className="float-right">Hatch Steps:</h6>
                    </div>
                    <div className="col-6">
                      <h6 className="float-left">{this.state.hatchSteps}</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container row">
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-6">
                      <h6 className="float-right">Catch Rate:</h6>
                    </div>
                    <div className="col-6">
                      <h6 className="float-left">{this.state.catchRate}%</h6>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-6">
                      <h6 className="float-right">Abilities:</h6>
                    </div>
                    <div className="col-6">
                      <h6 className="float-left">{this.state.abilities}</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container row">
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-6">
                      <h6 className="float-right">Gender Ratio:</h6>
                    </div>
                    <div className="col-6">
                      <div className="progress">
                        <div className="progress-bar male" role="progressbar" style={{ width: `${this.state.genderRatioMale}%` }}>
                          <small>{this.state.genderRatioMale}</small>
                        </div>
                        <div className="progress-bar female" role="progressbar" style={{ width: `${this.state.genderRatioFemale}%` }}>
                        <small>{this.state.genderRatioFemale}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 pb-3">
                  <div className="row">
                    <div className="col-6">
                      <h6 className="float-right">EVs:</h6>
                    </div>
                    <div className="col-6">
                      <h6 className="float-left">{this.state.evs.split(', ').map((ev, i) => {
                        return (<div key={i}>{ev}</div>)
                      })}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
