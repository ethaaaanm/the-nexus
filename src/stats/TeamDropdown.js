import React, { useEffect, useRef, useState } from "react";
import { BiSolidDownArrow } from "react-icons/bi";
import "./stats.css";

const TeamDropdown = ({ teams, onTeamChange, defaultTeamId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState(
        teams.find((team) => team.id === defaultTeamId) || teams.find(team => team.id === "All")
    );
    const dropdownRef = useRef(null);

    const handleToggle = () => setIsOpen(!isOpen);

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
        <div ref={dropdownRef} className="stats-dropdown-container">
           <button
                className={`stats-dropdown-button ${isOpen ? "active" : ""} ${
                    selectedTeam?.name === "All Teams" ? "no-details" : ""
                }`}
                onClick={handleToggle}
            >
                <div className="stats-team-row" key={selectedTeam?.id}>
                <img 
                    src={selectedTeam?.icon || ""} 
                    alt={`${selectedTeam?.name} logo`} 
                    className={`team-icon ${
                        selectedTeam?.id === "R1" ? "refined-icon" : "default-icon"
                    }`} 
                />
                    <div className="stats-team-details">
                        <div className="stats-team-info-row">
                            <p className="stats-team-name">{selectedTeam?.name || "team"}</p>
                            {selectedTeam?.name !== "ALL TEAMS" && (
                                <p className="stats-team-abbrev">{selectedTeam?.abbrev}</p>
                            )}
                        </div>
                        {selectedTeam?.name !== "ALL TEAMS" && (
                            <p className="stats-team-record">{selectedTeam?.record}</p>
                        )}
                    </div>
                </div>
                <span className={`stats-dropdown-arrow ${isOpen ? "open" : ""}`}>
                    <BiSolidDownArrow className="downarrow-icon"/>
                </span>
            </button>

            {isOpen && (
                <ul className="stats-dropdown-menu">
                    {/* Render individual teams */}
                    {teams.map((team) => (
                        team.id !== "All" && ( // Exclude "All Teams" from the individual list
                            <li
                                key={team.id}
                                className="stats-dropdown-item"
                                onClick={() => handleSelect(team)}
                            >
                                {'Team ' + team.name}
                            </li>
                        )
                    )) }
                    {/* Render the "All Teams" option */}
                    <li
                    key="all-teams"
                    className="stats-dropdown-item"
                    onClick={() => handleSelect(teams.find(team => team.id === "All"))}
                    >
                        All Teams
                    </li>
                </ul>
            )}
        </div>
    );
};

export default TeamDropdown;
