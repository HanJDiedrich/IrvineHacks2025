import "./PlayGame.css";
import { useState, useEffect } from 'react';
import Gameboard from '../components/gameboard';
import { useLocation } from "react-router-dom";


function GameLives( {attempts, isDeleting} ) {
    return (
        <div className="lives-container">
            Mistakes Remaining: 
            {attempts.map((life, index) => 
                life ? (
                    <div key={index} 
                         className={`circle ${isDeleting === index ? "fade" : ""}`}
                    >
                    </div>
                ) : null
            )}
        </div>
    );
}

function PlayGame() {
    const location = useLocation()
    const state = location.state
    console.log("Receive data", state)
    console.log("Game name", state.gameName)
    console.log("Groups", state.groups)
    console.log("WordsPerGroup", state.wordsPerGroup)
    console.log("CreatorName:", state.creatorName)
    console.log("Category:", state.category)
    console.log("Visibility:", state.public)


    // Depending on how many groups and wordsPerGroup, create game board
    
    for (let i = 0; i < state.groups; i++){
        console.log(state.gameData[i].groupName)
        for (let j = 0; j < state.wordsPerGroup; j++){
            console.log(state.gameData[i].words[j])
        }
    }

    // Data structure for words
    const wordGrid = [];
    for (let i = 0; i < state.groups; i++){
        const group = {
            groupName: state.gameData[i].groupName,
            words: [],
        }
        for (let j = 0; j < state.wordsPerGroup; j++){
            group.words.push({
                word: state.gameData[i].words[j],
                selected: false,
            })
        }
        wordGrid.push(group)
    }
    console.log(wordGrid)



    const [attempts, setAttempts] = useState([true, true, true, true]);
    const [isDeleting, setIsDeleting] = useState(null);     // For unsuccessful matches
    const [isHopping, setIsHopping] = useState(false);      // For successful matches
    const [isVisible, setIsVisible] = useState(false);      // For transition

    
    const words = [                                         // Structure for words in tiles
        {group1 : [
            {word : "WORD1", selected : false}, 
            {word : "WORD2", selected : false}, 
            {word : "WORD3", selected : false}, 
            {word : "WORD4", selected : false}] 
        },
        {group2 : [
            {word : "WORD5", selected : false}, 
            {word : "WORD6", selected : false}, 
            {word : "WORD7", selected : false}, 
            {word : "WORD8", selected : false}]
        },
        {group3 : [
            {word : "WORD9", selected : false}, 
            {word : "WORD10", selected : false}, 
            {word : "WORD11", selected : false}, 
            {word : "WORD12", selected : false}]
        },
        {group4 : [
            {word : "WORD13", selected : false}, 
            {word : "WORD14", selected : false}, 
            {word : "WORD15", selected : false}, 
            {word : "WORD16", selected : false}]
        },
        
      ];
      

    // Need to check if a group of words selected is part of the same group name

    function checkGroup() {
    
    }


    useEffect(() => {
        setIsVisible(true);
        document.title = "Play Game";
    }, []);

    const handleSubmit = ( isCorrect ) => {                            
        // Correct answer
        if (isCorrect) {
            setIsHopping(true);
            setTimeout(() => setIsHopping(false), 500);         // Control wait time for bouncing animation
        } else {
            // Incorrect answer
            setIsDeleting(attempts.length - 1);
            setTimeout(() => {
                setAttempts(attempts => attempts.slice(0, -1));
                setIsDeleting(null);
            }, 300);                                            // Control wait time for deleting animation
        }
    }

    return (
        <div className={`gameplay-container ${isVisible ? "fade-in" : ""}`}>
            <Gameboard words={words} handleSubmit={handleSubmit} isHopping={isHopping}/>
            <GameLives attempts={attempts} isDeleting={isDeleting}/>
        </div>
    )
}

export default PlayGame;