// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import './SearchGames.css';

import { useNavigate } from 'react-router-dom';  // Import useNavigate for routing

//import { useNavigate } from 'react-router-dom';  // Import useNavigate for routing

// Source: https://medium.com/geekculture/create-a-simple-search-component-in-react-js-using-react-hooks-710c1dfe8b58
function Card({game}) {
  // Each card displays a game
  return (
    <div className="card">
      <h4>{game.name}</h4>
      <p>Creator: {game.creatorName}</p>
      <p>Category: {game.category}</p>
      <p>Created on: {game.dateCreated}</p>
    </div>
  );
}


function SearchList( {filteredGames} ) {
  return (
    <div className="game-list">
      {filteredGames.length === 0 ? (
        <p>No games found</p>
      ) : (
        filteredGames.map((game, index) => <Card key={index} game={game} />)
      )}
    </div>
  );
  };



function SearchGames() {
  //const navigate = useNavigate();  // Use navigate hook for programmatic navigation
  useEffect(() => {document.title = "Zottegories Search"}, []);  // Add an empty dependency array to useEffect
  
  const navigate = useNavigate()
  const [search, setSearch] = useState("");
  const [games, setGames] = useState([]); // Store fetched games

  const handleChange = (e) => {
    setSearch(e.target.value);
  }

  const handleReset = (e) => {
    setSearch("");
  }
  const handleSearch = async (e) => {
    e.preventDefault();
  
    try {
      let response;
      if (search === "") { // Empty search, fetch all games
        response = await fetch("http://localhost:5000/get_game_data");
      } else { // Search by category
        response = await fetch(`http://localhost:5000/get_category_data?category=${search}`);
      }
      if (response.ok) {
        const data = await response.json();
        const games = data.map(game => ({
          name: game[0],        // game[0] -> name
          creatorName: game[1], // game[1] -> creatorName
          category: game[2],    // game[2] -> category
          dateCreated: game[3], // game[3] -> dateCreated
        }));
  
        setGames(games); // Update state with the games data
        console.log("Fetched games:", games);
      } else {
        console.error("Failed to fetch data:", response.status);
      }
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  return (
    <div className="container text-center my-5">
        <h1 className="display-4 text-success">Search for past Zottegories here!</h1>
        <p className="lead text-muted">
            Search for category or leave blank
            <br/>
            <input 
            type="text" 
            value={search} 
            onChange={handleChange}/>
            <button className="btn btn-info" class="searchButtons" onClick={handleSearch}>Search</button>
        </p>
        
        
          <SearchList filteredGames={games}/>
        
        
    </div>
  );
};

export default SearchGames;
  