// src/pages/Home.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for routing
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();  // Use navigate hook for programmatic navigation
    useEffect(() => {document.title = "Home"}, []);  // Add an empty dependency array to useEffect
  return (
    <div className="container text-center my-5">
      <h1 className="display-4 text-success">Connections generator!</h1>
      <p className="lead text-muted">
        Select an option
      </p>

      <div className="d-grid gap-2 d-md-block">
        <button
          className="btn btn-primary btn-lg"
          onClick={() => navigate('/SearchGames')}  // Navigate to Search page
        >
          Search Games
        </button>
        <button
          className="btn btn-success btn-lg"
          onClick={() => navigate('/CreateGame')}  // Navigate to Create Game page
        >
          Create Game
        </button>
      </div>
    </div>
  );
};

export default Home;
