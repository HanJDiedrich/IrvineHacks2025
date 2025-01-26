
import React, { useState, useEffect } from "react";
import "./gameboard.css";
import { useNavigate } from 'react-router-dom';
import { all } from "axios";

function Gameboard( {matchedWords, unmatchedWords, groupCount, wordsPerGroupCount, handleSubmit, isHopping} ) { 
    //console.log("The new words:", wordGrid)
    //console.log("Number of groups:", groupCount)
    //console.log("Number of words in a group:", wordsPerGroupCount)
    //const newWordGrid = [...wordGrid]
    //console.log("The new word grid:", wordGrid)

  // Shuffle word function
  useEffect(() => {
    if(unmatchedWords.length == 0){
      setGameOver(true);
      setTiles(shuffleArray([...unmatchedWords]));
    }else{
      setTiles(shuffleArray([...unmatchedWords]));
    }
    
  }, [unmatchedWords]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  };

  const shuffleWords = () => {
    setTiles(shuffleArray([...unmatchedWords])); // Create a new array to avoid mutation
  };

  // Add words to the tiles and shuffles them
  const [tiles, setTiles] = useState(shuffleArray(unmatchedWords));
  const [matchedTiles, setMatchedTiles] = useState(matchedWords);
  const [gameOver, setGameOver] = useState(false);
  const [displayGroupName, setDisplayGroupName] = useState("");
  const [notAMatch, setNotAMatch] = useState(false);



  // Select max wordsPerGroupCount tiles
  const handleTileClick = (index) => {
    const newSelectedTiles = [...tiles];
    console.log("Selected tiles: ",tiles.filter(e => e.selected).length < wordsPerGroupCount)

    if (newSelectedTiles[index].selected || tiles.filter(e => e.selected).length < wordsPerGroupCount) { //don't allow selection if enough selected already
      newSelectedTiles[index].selected = !newSelectedTiles[index].selected; //deselect if already selected
      setTiles(newSelectedTiles);
    }
  };

  const handleTileSubmit = () => {
    const selectedTiles = tiles.filter(tile => tile.selected);

    console.log("Submit selected:",selectedTiles)

    // Check if enough was selected
    if (selectedTiles.length < wordsPerGroupCount){
      console.log("not enough ")
      return;
    }
    //Check for group match
    const groupMatch = selectedTiles[0].groupName
    console.log("Is this the group?:", groupMatch)
    
    //Check all selected
    const allInSameGroup = selectedTiles.every(tile => tile.groupName === groupMatch)
    console.log("This is the match:", allInSameGroup)

    const isCorrect = allInSameGroup

    if(isCorrect){
      console.log("This is the match:", groupMatch)
      setDisplayGroupName(groupMatch)
      setTimeout(() => setDisplayGroupName(""), 4000);
    }else{
      setNotAMatch(true)
      setTimeout(() => setNotAMatch(""), 4000);
    }

    handleSubmit(isCorrect, tiles);


  };
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate("/"); // Navigate to home page

  };
  return (
    <div className="game-container">
      <header className="title-container">
        <h1 className="title">Zottegories</h1>
        <p className="subtitle">Match groups of {wordsPerGroupCount} words!</p>
      </header>

      {/* Display matched group name */}
      {displayGroupName && (
        <div className="group-name-popup">
          <h2>Matched Group: {displayGroupName}</h2>
        </div>
      )}

      {/* Display not a match */}
      {notAMatch && (
        <div className="group-name-popup">
          <h2>Not a match</h2>
        </div>
      )}

      <div className="button-container">
        <button id="shuffleButton" onClick={shuffleWords}>
            Shuffle Words
        </button>

        <button id="submitButton" onClick={handleTileSubmit}>
            Submit
        </button>
      </div>

      {gameOver && (
        <div className="victory-popup">
          <h2>Congratulations, You Won!</h2>
          <button onClick={handleGoHome}>Go to Home</button>
        </div>
      )}

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
