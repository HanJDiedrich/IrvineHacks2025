import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Zottegories</div>
      <div className="navbar-links">
        <NavLink to="/" className="navbar-link">Home</NavLink>
        <NavLink to="/SearchGames" className="navbar-link">Search Games</NavLink>
        <NavLink to="/CreateGame" className="navbar-link">Create Game</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;