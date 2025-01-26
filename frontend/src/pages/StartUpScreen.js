import React , {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./StartUpScreen.css";

const StartupScreen = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);    // For transition

  useEffect(() => {
    document.title = "Startup Screen - Zottegories";
    setIsVisible(true);
  }, []);

  return (
    <div className={`startUpScreen ${isVisible ? "fade-in" : ""}`}> 
      {/* Main Content */}
      <h1 className="zottegories">Zottegories</h1>
      <h2 className="letsMakeSome">Let’s make some connections.</h2>

      {/* Buttons */}
      <div className="buttonContainer">
        <button
          className="startUpScreenItem"
          onClick={() => navigate("/SearchGames")}
        >
          Search Games
        </button>
        <button
          className="startUpScreenInner"
          onClick={() => navigate("/CreateGame")}
        >
          Create Game
      </button>
    </div>
  </div>
  );
};

export default StartupScreen;