import React, { useEffect, useRef, useState } from "react";
import { BiSolidDownArrow } from "react-icons/bi";
import "./stats.css";

const TeamDropdown = ({ teams, onTeamChange, defaultTeamId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState(
        teams.find((team) => team.id === defaultTeamId) || { id: "ALL", name: "ALL TEAMS" }
    );
    const dropdownRef = useRef(null);

    const handleToggle = () => setIsOpen(!isOpen);

    const handleSelect = (team) => {
        setSelectedTeam(team);
        setIsOpen(false);
        onTeamChange(team.id);
    };

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("click", handleOutsideClick);
        return () => document.removeEventListener("click", handleOutsideClick);
    }, []);


    const teamNameClass = `stats-team-name ${selectedTeam?.id === "ALL" ? "all-teams-name" : ""}`;

    return (
        <div ref={dropdownRef} className="stats-dropdown-container">
            <button className={`stats-dropdown-button ${isOpen ? "active" : ""}`} onClick={handleToggle}>
                <div className="stats-team-row">
                    {selectedTeam?.id === "ALL" && (
                        <p className={teamNameClass}>{selectedTeam?.name}</p>
                    )}
                    <div className="stats-team-details">
                        <div className="stats-team-info-row">
                            {selectedTeam?.id !== "ALL" && (
                                <p className={teamNameClass}>{selectedTeam?.name}</p>
                            )}
                            {selectedTeam?.id !== "ALL" && (
                                <p className="stats-team-abbrev">{selectedTeam?.abbrev}</p>
                            )}
                        </div>
                        {selectedTeam?.id !== "ALL" && (
                            <p className="stats-team-record">{selectedTeam?.record}</p>
                        )}
                    </div>
                </div>
                <span className={`stats-dropdown-arrow ${isOpen ? "open" : ""}`}>
                    <BiSolidDownArrow className="downarrow-icon" />
                </span>
            </button>

            {isOpen && (
                <ul className="stats-dropdown-menu">
                    <li
                        key="all-teams"
                        className="stats-dropdown-item"
                        onClick={() => handleSelect({ id: "ALL", name: "ALL TEAMS" })}
                    >
                        All Teams
                    </li>
                    {/* Individual teams */}
                    {teams.map((team) => (
                        <li key={team.id} className="stats-dropdown-item" onClick={() => handleSelect(team)}>
                            <p className="stats-dropdown-item-team-name">{team.name}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TeamDropdown;
