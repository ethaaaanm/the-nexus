import { React, useState } from "react";
import { Link } from "react-router-dom";
import UltimateIcon from "../res/images/ic_ultimate.svg";
import SoftballIcon from "../res/images/ic_softball.svg";
import BasketballIcon from "../res/images/ic_basketball.svg"
import VolleyballIcon from "../res/images/ic_volleyball.svg"
import TeamDropdown from "./TeamDropdown";
import DateDropdown from "../home/DateDropdown";
import { BiSolidPencil } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
import { teamDB } from "../data/teamData";

import "./stats.css";

const sportIcons = {
    "Ultimate Frisbee": UltimateIcon,
    Softball: SoftballIcon,
    Basketball: BasketballIcon,
    Volleyball: VolleyballIcon,
  };

const players = [
    { id: 1, name: "Ethan Mah", age: 23, height: "5'10\"", team: "Ref" },
    { id: 2, name: "Nathan Chak" },
    { id: 3, name: "Timothy Chang" },
    // Add more players
];

const initialStats = {
    "Ultimate Frisbee": { points: 0, assists: 0, blocks: 0 },
    Softball: { hits: 0, "at Bats": 0, "runs Batted In": 0 },
    Basketball: { points: 0, assists: 0, blocks: 0, steals: 0, rebounds: 0 },
    Volleyball: { serves: 0 }
};

const sport = [
    { name: "Ultimate Frisbee", stats: ["Points (PTS)", "Assists (AST)", "Blocks (BLK)"] },
    { name: "Softball", stats: ["Hits (HIT)", "At Bats (AB)", "Runs Batted In (RBI)"] },
    { name: "Basketball", stats: ["Points (PTS)", "Assists (AST)", "Blocks (BLK)", "Steals (STL)", "Rebounds (REB)"] },
    { name: "Volleyball", stats: ["Serves (SRV)"] },
];

const date = ["6/4 | 7:00 PM"]

const InputStats = () => {
    const [selectedPlayer, setSelectedPlayer] = useState(players[0]);
    const [stats, setStats] = useState(initialStats);
    const [selectedMonth, setSelectedMonth] = useState("June"); // Track selected month
    const [selectedYear, setSelectedYear] = useState(2025);


    const handleTeamChange = (team) => {
        console.log("Selected team:", team);
    };

    const handleStatChange = (sport, stat, value) => {
        setStats((prevStats) => ({
            ...prevStats,
            [sport]: {
                ...prevStats[sport],
                [stat]: value
            }
        }));
    };

    return (
        <div className="input-stats-container">
            <div className="input-stats">
                <div className="input-stats-sidebar">
                    <Link to="/stats" className="exit-button-link">
                        <button className="exit-button"> Exit  </button>
                    </Link>

                    <div className="input-stats-column">
                        <TeamDropdown
                            teams={teamDB} // no ALL TEAMS
                            defaultTeamId="G1"
                            onTeamChange={handleTeamChange}
                        />
                        <ul className="input-player-list">
                            {players.map((player) => (
                                <li
                                    className="input-player-item"
                                    key={player.id}
                                    id={selectedPlayer.id === player.id ? "active" : ""}
                                    onClick={() => setSelectedPlayer(player)}
                                >
                                    <h4 className="input-player-sidebar-name">{player.name}</h4>
                                    <h5 className="input-player-sidebar-team">{player.team}</h5>
                                </li>
                            ))}
                        </ul>
                            <button className="input-add-player-button">
                                <FaPlus className="input-add-icon"/>Add Player
                            </button>
                    </div>
                </div>


                <div className="input-stats-content">
                    <div className="input-player-header">
                        <div className="input-player-info-column">
                            <h5 className="input-player-team">{selectedPlayer.team}</h5>
                            <h1 className="input-player-name">{selectedPlayer.name}</h1>
                            <div className="input-player-stat-button-row">
                            <button className="input-player-stat-button">
                                <h4 className="input-player-age">{selectedPlayer.age} yrs</h4>
                                <BiSolidPencil className="input-player-edit-icon"/>
                            </button>
                            <button className="input-player-stat-button">
                                <h4 className="input-player-height">{selectedPlayer.height}</h4>
                                <BiSolidPencil className="input-player-edit-icon"/>
                            </button>
                            </div>
                        </div>
                        
                        <div className="input-stat-date-dropdown">
                            <DateDropdown
                                months={["June", "July", "August", `${selectedYear} SEASON`]}
                                defaultMonth={`${selectedYear} SEASON`}
                                onMonthChange={setSelectedMonth}
                            />
                        </div>
                    </div>

                    {/* Stats Input Sections */}
                    <div className="input-sport-stat-section">
                        {Object.keys(initialStats).map((sport) => (
                            <div key={sport} className="input-sport-stat-card">
                                <div className="input-sport-stat-header">
                                    <div className="input-sport-stat-header-left">
                                        <img src={sportIcons[sport]} alt={`${sport} icon`} className="input-sport-stat-icon" />
                                        <h2 className="input-sport-stat-title">{sport}</h2>
                                    </div>
                                    <p className="input-sport-stat-date">{date}</p>
                                </div>
                                <div className="input-sport-stat-row">
                                    {Object.keys(initialStats[sport]).map((stat) => (
                                        <div key={stat} className="input-sport-stat-box">
                                            <p>{stat.toUpperCase()}</p>
                                            <input
                                                type="number"
                                                value={stats[sport][stat]}
                                                onChange={(e) =>
                                                    handleStatChange(sport, stat, e.target.value)
                                                }
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Save Button (To connect with Firestore later) */}
                    <button className="save-button">Save Stats</button>
                </div>
            </div>
        </div>
    );
};

export default InputStats;