import React , {useEffect}from "react";
import { useNavigate } from "react-router-dom";
import "./StartUpScreen.css";

const StartupScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Startup Screen - Zottegories";
  }, []);

  return (
    <div className="startUpScreen"> 
      {/* Main Content */}
      <div className="zottegories-title">Zottegories</div>
      <div className="letsMakeSome">Let’s make some connections.</div>

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