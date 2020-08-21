import React, { Component } from "react";

import Navbar from "./Navbar";
import PokemonList from "../pokemon/PokemonList";
import Buttons from '../buttons/Buttons';

import axios from 'axios';



export default class Dashboard extends Component {
  state = {
    url: 'https://pokeapi.co/api/v2/pokemon/',
    currentPage: 1,
    pokemon: []
  }

  componentDidMount() {
    axios.get(this.state.url).then(async res => {
      const { next, results } = res.data;
      await this.setState({ 
        url: next,
        pokemon: results
      })
    })
  }

  changePage = (type) => {
    let url;
    let pokemon;
    
    switch(type) {
      case "next": {
        axios.get(this.state.url).then(async res => {
          url = await res.data.next;
          pokemon = await res.data.results;

          this.setState({ 
            url, 
            currentPage: this.state.currentPage + 1,
            pokemon
          })
        }).catch(err => console.log(`Error: "next"! ${err}`))
        break;
      }
      
      case "previous": {
        axios.get(this.state.url).then(async res => {
          url = await res.data.previous;
          pokemon = await res.data.results;

          this.state.currentPage > 1 ? (
            this.setState({ 
              url, 
              currentPage: this.state.currentPage - 1,
              pokemon
            })
          ) : console.log('Error: previous page not found.');
        }).catch(err => console.log(`Error: "previous"! ${err}`))
        break;
      }
      
      default: return;
    }
  }
  render() {
    return (
      <div className="container">
        <div className="dashboard">
          <Navbar />
          <PokemonList pokemon={this.state.pokemon} />
          <div className="d-flex justify-content-center m-2">
            <Buttons changePage={this.changePage} />
          </div>
        </div>
      </div>
    );
  }
}
