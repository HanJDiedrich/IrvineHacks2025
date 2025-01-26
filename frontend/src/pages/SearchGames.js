// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import './SearchGames.css';

//import { useNavigate } from 'react-router-dom';  // Import useNavigate for routing

// Source: https://medium.com/geekculture/create-a-simple-search-component-in-react-js-using-react-hooks-710c1dfe8b58
function Card({game}) {
  // Each card displays a game
  return (
    <div className="card">
        {game.name}
    </div>
  );
}

function SearchList( {filteredGames} ) {
    // Display results for search here
    const filtered = filteredGames.map((game, index) => 
      <Card key={index} game={game}/>
    );

    return (
      <div className="scroll">
        {filtered}
      </div>
    );
  };


function SearchGames() {
  //const navigate = useNavigate();  // Use navigate hook for programmatic navigation
  useEffect(() => {document.title = "Search for Games"}, []);  // Add an empty dependency array to useEffect

  //fetch("http://localhost:5000/api").then(response => response.jpsn()).then;

  const [search, setSearch] = useState("");

  const games = [{name: "Han"}, 
                 {name : "Angie"}, 
                 {name : "Xuan"}, 
                 {name: "Danica"},
                 {name: "Game1"},
                 {name: "Game2"},
                 {name: "Game3"},];    // Test with a hardcoded array of game names for now

  const filteredGames = games.filter(
    game => {
      return (
        game.name.toLowerCase().includes(search.toLowerCase())
      );
    }
  );

  const handleChange = (e) => {
    setSearch(e.target.value);
  }

  const handleReset = (e) => {
    setSearch("");
  }

  return (
    <div className="container text-center my-5">
        <h1 className="display-4 text-success">Welcome to the Game App!</h1>
        <p className="lead text-muted">
            Search games here
            <br/>
            <input type="text" value={search} onChange={handleChange}/>
            <button className="btn btn-info" onClick={handleReset}>Reset</button>
        </p>
        <>
          <SearchList filteredGames={filteredGames}/>
        </>
    </div>
  );
};

export default SearchGames;
  