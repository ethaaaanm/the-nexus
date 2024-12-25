import React, { useState } from "react";
import "./home.css";

const Dropdown = ({ months, onMonthChange, defaultMonth }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(defaultMonth);

  const handleToggle = () => setIsOpen(!isOpen);
  const handleSelect = (month) => {
    setSelectedMonth(month);
    setIsOpen(false);
    onMonthChange(month);
  };

  return (
    <div className="dropdown-container">
      <button
        className={`dropdown-button ${isOpen ? "active" : ""}`}
        onClick={handleToggle}
      >
        <span>{selectedMonth}</span>
        <span className={`dropdown-arrow ${isOpen ? "open" : ""}`}>&#9660;</span>
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {months.map((month) => (
            <li
              key={month}
              className="dropdown-item"
              onClick={() => handleSelect(month)}
            >
              {month}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;