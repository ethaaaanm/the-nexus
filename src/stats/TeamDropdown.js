import React, { useEffect, useRef, useState } from "react";
import { BiSolidDownArrow } from "react-icons/bi";
import { teamDB } from "../data/homeData";

const TeamDropdown = ({ teams, onTeamChange, defaultTeam }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(defaultTeam);
  const dropdownRef = useRef(null);

  // Handle toggle
  const handleToggle = () => setIsOpen(!isOpen);

  // Handle selection
  const handleSelect = (team) => {
    setSelectedTeam(team);
    setIsOpen(false);
    onTeamChange(team);
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
        <span>{selectedTeam}</span>
        <span className={`dropdown-arrow ${isOpen ? "open" : ""}`}>
          <BiSolidDownArrow className="downarrow-icon"/>
        </span>
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {teams.map((team) => (
            <li
              key={team}
              className="dropdown-item"
              onClick={() => handleSelect(team)}
            >
              {team}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TeamDropdown;
