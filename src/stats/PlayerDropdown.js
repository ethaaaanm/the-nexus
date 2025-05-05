import React, { useEffect, useRef, useState } from "react";
import { BiSolidDownArrow } from "react-icons/bi";
import "./inputstats.css"; // Make sure to import your CSS

const PlayerDropdown = ({ players, onPlayerSelect, defaultPlayer, teams }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState(defaultPlayer);
    const dropdownRef = useRef(null);

    const handleToggle = () => setIsOpen(!isOpen);

    const handleSelect = (player) => {
        setSelectedPlayer(player);
        setIsOpen(false);
        onPlayerSelect(player);
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

    return (
        <div ref={dropdownRef} className="player-selector-container">
            <button className={`player-selector-button ${isOpen ? "active" : ""}`} onClick={handleToggle}>
                <p className={`player-selector-name-text ${isOpen ? "active" : ""}`}>
                    {selectedPlayer ? selectedPlayer.playerName : "Player List"}
                </p>
                <span className={`stats-dropdown-arrow ${isOpen ? "open" : ""}`}>
                    <BiSolidDownArrow className="downarrow-icon" />
                </span>
            </button>
            {isOpen && (
                <ul className="player-selector-menu">
                    {players.map((player) => (
                        <li key={player.id} className={`player-selector-item ${selectedPlayer?.id === player.id ? "active" : ""}`} onClick={() => handleSelect(player)}>
                            <h4 className={`player-selector-name ${selectedPlayer?.id === player.id ? "active" : ""}`}>{player.playerName}</h4>
                            <h5 className={`player-selector-team ${selectedPlayer?.id === player.id ? "active" : ""}`}>
                                {teams.find(t => t.id === player.teamID)?.abbrev || "Unknown"}
                            </h5>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PlayerDropdown;