import React, { useState } from "react";
import "./gameboard.css";

function Gameboard( {words, handleSubmit, isHopping} ) { 
    const allWords = words.flatMap(group => {
    const groupKey = Object.keys(group)[0];
    return group[groupKey].map(item => (
        { word: item.word, 
          selected: item.selected}
        ));
    });

  // shuffle word function
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  };

  const shuffleWords = () => {
    setTiles(shuffleArray([...allWords])); // Create a new array to avoid mutation
  };

  // Need to shuffle tiles
  const [tiles, setTiles] = useState(shuffleArray(allWords));

  function checkCorrectGroups() {
    // Check if selected tiles in the same group in words array
    for (const group of words) {
        const groupName = Object.keys(group)[0];
        const groupArray = group[groupName];

        const allSelectedMatch = groupArray.every(word => word.selected);
        
        if (allSelectedMatch) {
            console.log("True")
            return true;
        }

    console.log("False")
    return false;
  }
}

  // Select max 4 tiles
  const handleTileClick = (index) => {
    const newSelectedTiles = [...tiles];
    console.log(tiles.filter(e => e.selected).length < 4)

    if (newSelectedTiles[index].selected || tiles.filter(e => e.selected).length < 4) {
      newSelectedTiles[index].selected = !newSelectedTiles[index].selected;
      setTiles(newSelectedTiles);
    }
  };

  const handleTileSubmit = () => {
    const isCorrect = handleTileClick();
    return handleSubmit(isCorrect);
  };

  return (
    <div className="game-container">
      <header className="title-container">
        <h1 className="title">Zottegories</h1>
        <p className="subtitle">Create groups of four!</p>
      </header>

      <div className="button-container">
        <button id="shuffleButton" onClick={shuffleWords}>
            Shuffle Words
        </button>

        <button id="submitButton" onClick={handleTileSubmit}>
            Submit
        </button>
      </div>

      <div className="grid">
        {tiles.map((word, index) => (
          <div
            key={index}
            className={`tile ${isHopping ? 'hopping' : ''} ${word.selected ? 'selected' : ''}`}
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
