import "./gamelives.css";
import { useState } from 'react';
import anteaterLogo from '../assets/anteater-logo.png'

function GameLives() {
    const [attempts, setAttempts] = useState([true, true, true, true]);

    return (
        <div className="lives-container">
            Attempts: 
            {attempts.map((life) => {
                if (life){
                    <div className="circle">
                        {/* <img src={anteaterLogo} alt="Anteater lives"/> */}
                    </div>
                }
            })}
        </div>
    );
}

export default GameLives;

// {tiles.map((word, index) => (
//     <div
//       key={index}
//       className={`tile ${word.selected ? 'selected' : ''}`}
//       onClick={() => handleTileClick(index)}
//     >
//       {word.word}
//     </div>
//   ))}