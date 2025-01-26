import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartUpScreen from "./pages/StartUpScreen";
import CreateGame from "./pages/CreateGame";
import PlayGame from "./pages/PlayGame";
import SearchGames from "./pages/SearchGames";
import Navbar from './components/navbar';

import './index.css';



const App = () => {
  return (
    <Router>
      <Navbar /> {/* Navbar will be on all pages */}
      <Routes>
        <Route path="/" element={<StartUpScreen />} />
        <Route path="/CreateGame" element={<CreateGame />} />
        {/* <Route path="/PlayGame/:gameId" element={<PlayGame />} /> */}
        <Route path="/SearchGames" element={<SearchGames />} />
        <Route path="/PlayGame" element={<PlayGame/>} />
      </Routes>
    </Router>
  );
};

export default App;