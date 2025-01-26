import React from "react";
import { useNavigate } from "react-router-dom";
import "./StartUpScreen.css";

const StartupScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="startUpScreen">
      {/* Header */}
      <div className="startUpScreenChild">
        <div className="zottegories">Zottegories</div>
        <div className="searchASet" onClick={() => navigate("/search")}>
          Search a Set
        </div>
      </div>

      {/* Main Content */}
      <div className="zottegories1">Zottegories</div>
      <div className="letsMakeSome">Let’s make some connections.</div>

      {/* Buttons */}
      <div className="startUpScreenItem" onClick={() => navigate("/SearchGames")}>
        Search Games
      </div>
      <div className="startUpScreenInner" onClick={() => navigate("/CreateGame")}>
        Create Game
      </div>
    </div>
  );
};

export default StartupScreen;