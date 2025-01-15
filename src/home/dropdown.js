import React, { useEffect, useRef, useState } from "react";
import "./home.css";

const Dropdown = ({ months, onMonthChange, defaultMonth }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(defaultMonth);
  const dropdownRef = useRef(null);

  // Handle toggle
  const handleToggle = () => setIsOpen(!isOpen);

  // Handle selection
  const handleSelect = (month) => {
    setSelectedMonth(month);
    setIsOpen(false);
    onMonthChange(month);
  };

  // Close dropdown if scrolled out of view or clicked outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      if (dropdownRef.current) {
        const rect = dropdownRef.current.getBoundingClientRect();
        if (rect.top < 0 || rect.bottom > window.innerHeight) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener("click", handleOutsideClick);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="dropdown-container">
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
