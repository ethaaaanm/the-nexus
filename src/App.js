import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home/Home";
import AdminPage from "./admin/AdminPage";
import StatsPage from "./stats/Stats";
import TopNavBar from "./components/TopNavBar";
import "./App.css";
import "./res/styles/global.css";

function App() {
  return (
    <div className="App">
      <Router>
        {/* Navigation Bar */}
        <TopNavBar />
        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/stats" element={<StatsPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;