import "./PlayGame.css";
import { useState } from 'react';
import Gameboard from '../components/gameboard';
// import anteaterLogo from '../assets/anteater-logo.png'

function GameLives( {attempts} ) {
    return (
        <div className="lives-container">
            Mistakes Remaining: 
            {attempts.map((life, index) => 
                life ? (
                    <div key={index} className="circle">
                        {/* <img src={anteaterLogo} alt="Anteater lives"/> */}
                    </div>
                ) : null
            )}
        </div>
    );
}

function PlayGame() {
    const [attempts, setAttempts] = useState([true, true, true, true]);

    const handleSubmit = () => {
        setAttempts({
        });
    }

    return (
        <div className="gameplay-container">
            <Gameboard handleSubmit={handleSubmit}/>
            <GameLives attempts={attempts} />
        </div>
    )
}

export default PlayGame;