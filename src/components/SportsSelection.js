import React, { useState } from "react";
import "./components.css"; 

const SportSelection = ({ onSelectSport }) => {
  const [selectedSport, setSelectedSport] = useState("Basketball");

  const handleSportClick = (sport) => {
    setSelectedSport(sport);
    onSelectSport(sport); 
  };

  return (
    <div className="sports-bar">
      {["Volleyball", "Basketball", "Softball", "Ultimate"].map((sport) => (
        <button
          key={sport}
          onClick={() => handleSportClick(sport)}
          className={`sports-button ${selectedSport === sport ? "active" : ""}`}
        >
          {sport}
        </button>
      ))}
    </div>
  );
};

export default SportSelection;