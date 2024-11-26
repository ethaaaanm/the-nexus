import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./home/Home";
import AdminPage from "./admin/AdminPage";

function App() {
  return (
    <Router>
      {/* Navigation Bar */}
      <nav>
        <Link to="/">Home</Link> | <Link to="/admin">Admin</Link>
      </nav>

      {/* Define Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;