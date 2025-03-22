import React, { useEffect, useRef, useState } from "react";
import { BiSolidDownArrow } from "react-icons/bi";
import "./stats.css";

const GameDropdown = ({ games, onGameChange, defaultGame }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedGame, setSelectedGame] = useState(defaultGame || (games.length > 0 ? games[0] : null));
    const dropdownRef = useRef(null);

    const handleToggle = () => setIsOpen(!isOpen);

    const handleSelect = (game) => {
        setSelectedGame(game);
        setIsOpen(false);
        onGameChange(game);
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
        <div ref={dropdownRef} className="dropdown-container">
            <button className={`dropdown-button ${isOpen ? "active" : ""}`} onClick={handleToggle}>
                {selectedGame?.id === "season" ? `${new Date().getFullYear()} Season` : selectedGame?.date}
                <span className={`dropdown-arrow ${isOpen ? "open" : ""}`}>
                    <BiSolidDownArrow className="downarrow-icon" />
                </span>
            </button>
            {isOpen && (
                <ul className="dropdown-menu">
                {games.map((game) => (
                    <li key={game.id} className="dropdown-item" onClick={() => handleSelect(game)}>
                        {game.id === "season" ? `${new Date().getFullYear()} Season` : `${game.date} - ${game.sport}`}
                    </li>
                ))}
            </ul>
            )}
        </div>
    );
};

export default GameDropdown;
