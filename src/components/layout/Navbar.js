import React, { Component } from "react";
import "./layout.scss";
import Logo from "../../assets/navbar-logo.png";

export default class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar fixed-top">
          <span className="navbar-brand mb-0 h1">
            <img className="navbar-logo" src={Logo} alt="" />
            Pokédex
          </span>
          {/* <div className="navbar-search">
            <i className="fas fa-search"></i>
          </div> */}
        </nav>
      </div>
    );
  }
}
