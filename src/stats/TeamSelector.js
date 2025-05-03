import React, { useEffect, useRef, useState } from "react";
import { BiSolidDownArrow } from "react-icons/bi";
import "./stats.css";

const TeamSelector = ({ teams, onTeamChange, defaultTeamId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState(
        teams.find((team) => team.id === defaultTeamId) || { id: "ALL", name: "FILTER BY TEAM" }
    );
    const dropdownRef = useRef(null);

    const handleToggle = () => setIsOpen(!isOpen);

    const handleSelect = (team) => {
        setSelectedTeam(team);
        setIsOpen(false);
        onTeamChange(team.id);
    };

    useEffect(() => {
        const defaultTeam = teams.find(team => team.id === defaultTeamId);

        const handleOutsideClick = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("click", handleOutsideClick);
        return () => document.removeEventListener("click", handleOutsideClick);
    }, []);

    return (
        <div ref={dropdownRef} className="stats-selector-container">
            <button className={`stats-selector-button ${isOpen ? "active" : ""}`} onClick={handleToggle}>
                <p className={`stats-selector-team-text  ${isOpen ? "active" : ""}`}>                {selectedTeam ? selectedTeam.name : (defaultTeamId === "SELECT TEAM" ? "Select Team" : "Filter by Team")}
                </p>
                <BiSolidDownArrow className={`stats-dropdown-arrow ${isOpen ? "open" : ""}`} />
            </button>
            {isOpen && (
                <ul className="stats-selector-menu">
                    <li
                        key="all-teams"
                        className="stats-dropdown-item"
                        onClick={() => handleSelect({ id: "ALL", name: "FILTER BY TEAM" })}
                    >
                        All Teams
                    </li>
                    {teams.map((team) => (
                        <li key={team.id} className="stats-selector-item" onClick={() => handleSelect(team)}>
                            {team.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TeamSelector;