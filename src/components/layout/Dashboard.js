import React, { Component } from "react";

import Navbar from "./Navbar";
import PokemonList from "../pokemon/PokemonList";
import Buttons from '../buttons/Buttons';

import "./layout.scss";

import axios from 'axios';



export default class Dashboard extends Component {
  state = {
    url: 'https://pokeapi.co/api/v2/pokemon/'
  }

  // componentDidMount() {
  //   axios.get(this.state.url).then(async res => {
  //     const { next } = res.data;
  //     await this.setState({ 
  //       url: next
  //     })
  //     console.log(this.state);
  //   })
  // }

  // changePage = (type) => {
  //   let newUrl;
    
  //   switch(type) {
  //     case "next": {
  //       axios.get(this.state.url).then(async res => {
  //         newUrl = await res.data.next;
  //         this.setState({ url: newUrl })
  //         console.log(this.state);
  //       }).catch(err => console.log(`Error: "next"! ${err}`))
  //       break;
  //     }
      
  //     case "previous": {
  //       axios.get(this.state.url).then(async res => {
  //         newUrl = await res.data.previous;
  //         this.setState({ url: newUrl })
  //         console.log(this.state);
  //       }).catch(err => console.log(`Error: "previous"! ${err}`))
  //       break;
  //     }
      
  //     default: return;
  //   }
  // }

  render() {
    return (
      <div className="container">
        <div className="dashboard">
          <Navbar />
          <PokemonList />
          <div className="d-flex justify-content-center m-2">
            <Buttons changePage={this.changePage} />
          </div>
        </div>
      </div>
    );
  }
}
