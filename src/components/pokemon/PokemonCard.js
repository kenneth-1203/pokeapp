import React, { Component } from "react";
import { Link } from "react-router-dom";

import spinner from "../../assets/spinner.gif";

export default class PokemonCard extends Component {
  state = {
    name: "",
    pokemonUrl: "",
    pokemonIndex: "",
    imageUrl: "",
    isLoading: true,
    manyRequests: false,
  };

  componentDidMount() {
    const { name, url } = this.props;
    const pokemonIndex = url.split("/")[url.split("/").length - 2];
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/`;

    fetch(`${pokemonUrl + pokemonIndex}`)
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          name,
          pokemonUrl,
          pokemonIndex,
          imageUrl: data.sprites.front_default,
        })
      );
  }

  render() {
    return (
      <Link
        to={`pokemon/${this.state.pokemonIndex}`}
        style={{ color: "inherit", textDecoration: "none" }}>
        
        <div className="pokemon-card">
          <h6 className="pokemon-card-title">{this.state.pokemonIndex}</h6>
          <img
            src={this.state.imageUrl}
            alt=""
            onLoad={() => this.setState({ isLoading: false })}
          ></img>

          {this.state.isLoading ? (
            <img src={spinner} width="70px" alt=""></img>
          ) : null}

          <p className="pokemon-card-body">
            {this.state.name
              .split(" ")
              .map(
                (letter) => letter.charAt(0).toUpperCase() + letter.substring(1)
              )
              .join(" ")}
          </p>
        </div>
      </Link>
    );
  }
}
