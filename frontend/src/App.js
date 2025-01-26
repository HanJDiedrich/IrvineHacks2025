import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import StartUpScreen from "./pages/StartUpScreen";
import Home from "./pages/Home";
import CreateGame from "./pages/CreateGame";
import PlayGame from "./pages/PlayGame";
import SearchGames from "./pages/SearchGames";
import Navbar from './components/navbar';
import './index.css'

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Navbar will be on all pages */}
      <Routes>
        <Route path="/" element={<StartUpScreen />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/CreateGame" element={<CreateGame />} />
        <Route path="/PlayGame/:gameId" element={<PlayGame />} />
        <Route path="/SearchGames" element={<SearchGames />} />
      </Routes>
    </Router>
  );
};

export default App;
