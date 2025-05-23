import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home/Home";
import AdminPage from "./admin/Admin";
import StatsPage from "./stats/Stats";
import InputStatsPage from "./stats/InputStats";
import AboutPage from "./about/About";
import ErrorPage from "./misc/404"
import SubmittedPage from "./misc/Submitted";
import TopNavBar from "./components/TopNavBar";
import Footer from "./components/Footer";

import "./App.css";
import "./res/styles/global.css";

function App() {
  return (
    <Router basename="/">
      <TopNavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/input-stats" element={<InputStatsPage/>}/>
        <Route path="/about" element={<AboutPage />} />
        <Route path="/submitted" element={<SubmittedPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;