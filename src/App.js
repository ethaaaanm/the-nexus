import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home/Home";
import AdminPage from "./admin/Admin";
import StatsPage from "./stats/Stats";
import AboutPage from "./about/About";
import TopNavBar from "./components/TopNavBar";
import "./App.css";
import "./res/styles/global.css";

function App() {
  return (
    <div className="App">
      <Router basename={process.env.PUBLIC_URL}>
        {/* Navigation Bar */}
        <TopNavBar />
        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;