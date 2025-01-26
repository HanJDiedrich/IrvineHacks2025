import "./PlayGame.css";
import Gameboard from '../components/gameboard';
import GameLives from '../components/gamelives';

function PlayGame() {
    return (
        <div className="gameplay-container">
            <Gameboard />
            <GameLives />
        </div>
    )
}

export default PlayGame;