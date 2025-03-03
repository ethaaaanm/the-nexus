import { React, useState } from "react";
import { Link } from 'react-router-dom';

import TeamDropdown from "./TeamDropdown";
import DateDropdown from "../home/DateDropdown";
import UltimateIcon from "../res/images/ic_ultimate.svg";
import UltimateActive from "../res/images/ic_ultimate_active.svg"
import UltimateHover from "../res/images/ic_ultimate_hover.svg"
import SoftballIcon from "../res/images/ic_softball.svg";
import SoftballActive from "../res/images/ic_softball_active.svg"
import SoftballHover from "../res/images/ic_softball_hover.svg"
import BasketballIcon from "../res/images/ic_basketball.svg";
import BasketballActive from "../res/images/ic_basketball_active.svg"
import BasketballHover from "../res/images/ic_basketball_hover.svg"
import VolleyballIcon from "../res/images/ic_volleyball.svg";
import VolleyballActive from "../res/images/ic_volleyball_active.svg"
import VolleyballHover from "../res/images/ic_volleyball_hover.svg"

import { teamDB } from "../data/teamData";

import "./stats.css";


const Stats = () => {
    const handleTeamChange = (team) => {
        console.log("Selected team:", team);
    };

    const [selectedMonth, setSelectedMonth] = useState("June"); // Track selected month
    const [selectedYear, setSelectedYear] = useState(2025);
    const [selectedSport, setSelectedSport] = useState(null);
    const [hoveredSport, setHoveredSport] = useState(null);


    const sports = [
        { id: "ultimate", defaultIcon: UltimateIcon, hoverIcon: UltimateHover, activeIcon: UltimateActive, alt: "Ultimate Frisbee Button" },
        { id: "basketball", defaultIcon: BasketballIcon, hoverIcon: BasketballHover, activeIcon: BasketballActive, alt: "Basketball Button" },
        { id: "volleyball", defaultIcon: VolleyballIcon, hoverIcon: VolleyballHover, activeIcon: VolleyballActive, alt: "Volleyball Button" },
        { id: "softball", defaultIcon: SoftballIcon, hoverIcon: SoftballHover, activeIcon: SoftballActive, alt: "Softball Button" },
    ];


    /** START TEMP DATA **/
    const teamLeaders = {
        points: { name: "James Wong", value: 5 },
        assists: { name: "Evan Chak", value: 13.3 },
        blocks: { name: "James Wong", value: 5 },
    };

    const players = [
        { rank: 1, name: "Ethan Mah", team: "GEN", pts: 7, ast: 2, blk: 3, age: 23, height: "5'10", change: "up" },
        { rank: 2, name: "Evan Chak", team: "GEN", pts: 1, ast: 13, blk: 1, age: 20, height: "5'10", change: "down" },
        { rank: 3, name: "Alexander Wong", team: "GEN", pts: 6, ast: 1, blk: 2, age: "-", height: "-", change: null },
        { rank: 4, name: "Jordan Lam", team: "GEN", pts: 3, ast: 5, blk: 3, age: "-", height: "-", change: null },
        { rank: 5, name: "Nathan Chak", team: "GEN", pts: 2, ast: 2, blk: 2, age: "-", height: "-", change: null },
    ];
    /** END TEMP DATA **/

    return (
        <div className="stats-container">
            <div className="stats">
                <div className="stats-menu">
                    <h3 className="stats-header">League Stats</h3>
                    <div className="stats-team-dropdown">
                        <TeamDropdown
                            teams={teamDB}
                            defaultTeamId="G1"
                            onTeamChange={handleTeamChange}
                        />
                    </div>
                    <div className="stats-button-row">
                        <div className="stats-date-dropdown">
                            <DateDropdown
                                months={["JUNE", "JULY", "AUGUST", `${selectedYear} SEASON`]}
                                defaultMonth={`${selectedYear} SEASON`}
                                onMonthChange={setSelectedMonth}
                            />
                        </div>
                        <div className="stats-sports-button-row">
                            {sports.map((sport) => (
                                <img
                                    key={sport.id}
                                    src={
                                        selectedSport === sport.id
                                            ? sport.activeIcon  // Show active icon if selected
                                            : hoveredSport === sport.id
                                                ? sport.hoverIcon   // Show hover icon if hovered
                                                : sport.defaultIcon // Otherwise, show default
                                    }
                                    className={`stat-sport-button ${selectedSport === sport.id ? "active" : ""}`}
                                    alt={sport.alt}
                                    onClick={() => setSelectedSport(sport.id)}
                                    onMouseEnter={() => setHoveredSport(sport.id)}
                                    onMouseLeave={() => setHoveredSport(null)}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="stats-leaderboard-wrap">
                    <h4 className="stats-leaderboard-title">Team Leaders</h4>
                    <div className="stats-leaderboard-row">
                        {Object.entries(teamLeaders).map(([stat, leader]) => (
                            <div key={stat} className="leaderboard-card">
                                <h5 className="stat-title">{stat.charAt(0).toUpperCase() + stat.slice(1)} ({stat.toUpperCase()})</h5>
                                <h4 className="leader-name">{leader.name}</h4>
                                <h2 className="leader-value">{leader.value}</h2>
                            </div>
                        ))}
                    </div>

                    <div className="stats-player-list">
                        {players.map((player) => (
                            <div key={player.rank} className="player-card">
                                <span className="rank">
                                    {player.change === "up" && <span className="rank-up">▲</span>}
                                    {player.change === "down" && <span className="rank-down">▼</span>}
                                    {player.rank}
                                </span>
                                <div className="player-info">
                                    <div className="top-row">
                                        <span className="player-name">{player.name}</span>
                                        <span className="player-team">{player.team}</span>
                                    </div>
                                    <span className="player-stats">
                                        {player.pts} PTS, {player.ast} AST, {player.blk} BLK
                                    </span>
                                </div>
                                <div className="player-badges">
                                    <span className="badge">{player.age} yrs</span>
                                    <span className="badge">{player.height}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Link to="/input-stats" className="input-stats-link">
                        <button className="input-stats-button">Input Stats</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Stats;
