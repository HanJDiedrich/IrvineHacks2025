import React, { useState } from "react";
import "./gameboard.css";

const words = [
  {word : "WORD1", selected : false}, 
  {word : "WORD2", selected : false}, 
  {word : "WORD3", selected : false}, 
  {word : "WORD4", selected : false}, 
  {word : "WORD5", selected : false}, 
  {word : "WORD6", selected : false}, 
  {word : "WORD7", selected : false}, 
  {word : "WORD8", selected : false}, 
  {word : "WORD9", selected : false}, 
  {word : "WORD10", selected : false}, 
  {word : "WORD11", selected : false}, 
  {word : "WORD12", selected : false}, 
  {word : "WORD13", selected : false}, 
  {word : "WORD14", selected : false}, 
  {word : "WORD15", selected : false}, 
  {word : "WORD16", selected : false}, 
  {word : "WORD17", selected : false}, 
  {word : "WORD18", selected : false}, 
];

function Gameboard() {
  const [tiles, setTiles] = useState(words);

  // shuffle word function
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  };

  const shuffleWords = () => {
    setTiles(shuffleArray([...words])); // Create a new array to avoid mutation
  };

  const handleTileClick = (index) => {
    const newSelectedTiles = [...tiles];
    console.log(tiles.filter(e => e.selected).length < 4)
    if (newSelectedTiles[index].selected || tiles.filter(e => e.selected).length < 4) {
      newSelectedTiles[index].selected = !newSelectedTiles[index].selected;
      setTiles(newSelectedTiles);
    }
  };

  return (
    <div className="game-container">
      <header className="title-container">
        <h1 className="title">Zottegories</h1>
        <p className="subtitle">Create groups of four!</p>
      </header>

      <button id="shuffleButton" onClick={shuffleWords}>
        Shuffle Words
      </button>

      <button id="submitButton" onClick={shuffleWords}>
        Submit
      </button>

      <div className="grid">
        {tiles.map((word, index) => (
          <div
            key={index}
            className={`tile ${word.selected ? 'selected' : ''}`}
            onClick={() => handleTileClick(index)}
          >
            {word.word}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gameboard;
