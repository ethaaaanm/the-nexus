import { React, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { collection, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

import TeamSelector from "./TeamSelector";
import TeamDropdown from "./TeamDropdown";
import GameDropdown from "./GameDropdown";
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

import "./stats.css";

/***  Remaining Bugs:
 * 2. When Sport Icon is pressed, should go back to 2025 Season
 * 5. TeamSelector should be changed back to TeamDropdown as it shows stats, abbrev, etc. (May need to compare DB with ../TeamDB for structure)
 *   ***/


const Stats = () => {
    const [selectedSchedule, setSelectedSchedule] = useState({ id: "season", name: "2025 Season" });
    const [selectedYear, setSelectedYear] = useState(2025);
    const [selectedSport, setSelectedSport] = useState("Ultimate Frisbee");
    const [hoveredSport, setHoveredSport] = useState(null);
    const [players, setPlayers] = useState([]);
    const [teams, setTeams] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState("SELECT TEAM");
    const [loading, setLoading] = useState(true);
    const [displayedStats, setDisplayedStats] = useState([]);

    const sportsIcon = [
        { id: "Ultimate Frisbee", defaultIcon: UltimateIcon, hoverIcon: UltimateHover, activeIcon: UltimateActive, alt: "Ultimate Frisbee Button" },
        { id: "Basketball", defaultIcon: BasketballIcon, hoverIcon: BasketballHover, activeIcon: BasketballActive, alt: "Basketball Button" },
        { id: "Volleyball", defaultIcon: VolleyballIcon, hoverIcon: VolleyballHover, activeIcon: VolleyballActive, alt: "Volleyball Button" },
        { id: "Softball", defaultIcon: SoftballIcon, hoverIcon: SoftballHover, activeIcon: SoftballActive, alt: "Softball Button" },
    ];

    const statFields = {
        Basketball: ["Points (PTS)", "Rebounds (REB)", "Assists (AST)", "Blocks (BLK)", "Steals (STL)"],
        Volleyball: ["Wins (W)", "Losses (L)", "Serves (SRV)"],
        Softball: ["Hits (H)", "At Bats (AB)", "Runs Batted In (RBI)"],
        "Ultimate Frisbee": ["Points (PTS)", "Assists (AST)", "Blocks (BLK)"],
    };

    useEffect(() => {
        fetchPlayers();
        fetchSchedules();
        fetchTeams();

        setTimeout(() => {
            setSelectedSchedule((prev) => {
                if (prev.id === "season") {
                    return { id: "season", name: `${selectedYear} Season` };
                }
                return prev;
            });
        }, 0);
    }, [selectedYear, selectedSport]);

    const fetchPlayers = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "players"));
            const playerList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setPlayers(playerList);
            setLoading(false);

        } catch (error) {
            console.error("Error fetching players:", error);
        }
    };

    const fetchSchedules = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "schedule"));
            const fetchedSchedule = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            fetchedSchedule.sort((a, b) => {
                const parseDate = (dateString) => {
                    const [datePart, timePart] = dateString.split(" | ");
                    const [month, day] = datePart.split("/").map(Number);
                    const year = a.year;
                    return new Date(`${year}-${month}-${day} ${timePart}`);
                };

                return parseDate(a.date) - parseDate(b.date);  // Sort by ascending date
            });

            setSchedules(fetchedSchedule);
            setLoading(false);

        } catch (error) {
            console.error("Error fetching schedule:", error);
        }
    };

    const fetchTeams = async () => {
        const querySnapshot = await getDocs(collection(db, "teams"));
        const teamList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTeams(teamList);
    };

    const handleTeamChange = (teamID) => {
        setSelectedTeam(teamID);
    };

    const handleGameChange = (game) => {
        setSelectedSchedule(game);

        if (game.sport) {
            setSelectedSport(game.sport);
        }
    };


    useEffect(() => {
        const filtered = players.filter(player => {
            const matchesTeam = !selectedTeam || selectedTeam === "SELECT TEAM" || player.teamID === selectedTeam;
            const hasStats = selectedSchedule?.id === "season"
                ? player.seasonAverages?.[selectedYear]?.[selectedSport]
                : player.Stats?.[selectedSchedule.id];

            return matchesTeam && hasStats;
        });

        const updatedStats = filtered.map(player => {
            const playerStats = selectedSchedule?.id === "season"
                ? player.seasonAverages?.[selectedYear]?.[selectedSport] || {}
                : player.Stats?.[selectedSchedule.id] || {};
            return { ...player, stats: playerStats };
        });

        setDisplayedStats(updatedStats);
    }, [selectedSchedule, players, selectedTeam, selectedYear, selectedSport]);



    const getLeagueLeaders = (players, sport) => {
        const leaders = {};

        statFields[sport].forEach(stat => {
            const topPlayer = players
                .filter(player => {
                    const matchesTeam = !selectedTeam || selectedTeam === "SELECT TEAM" || player.teamID === selectedTeam;
                    const stats = selectedSchedule?.id === "season"
                        ? player.seasonAverages?.[selectedYear]?.[sport]
                        : player.Stats?.[selectedSchedule?.id];

                    return matchesTeam && stats && stats[stat] !== undefined;
                })
                .reduce((best, player) => {
                    const playerStatValue = selectedSchedule?.id === "season"
                        ? player.seasonAverages[selectedYear][sport][stat]
                        : player.Stats[selectedSchedule?.id][stat];

                    const bestStatValue = best
                        ? (selectedSchedule?.id === "season"
                            ? best.seasonAverages[selectedYear][sport][stat]
                            : best.Stats[selectedSchedule?.id][stat])
                        : -Infinity;

                    return playerStatValue > bestStatValue ? player : best;
                }, null);

            if (topPlayer) {
                leaders[stat] = {
                    name: topPlayer.playerName,
                    value: selectedSchedule?.id === "season"
                        ? topPlayer.seasonAverages[selectedYear][sport][stat]
                        : topPlayer.Stats[selectedSchedule?.id][stat]
                };
            }
        });

        return leaders;
    };



    const getPlayerStats = (player) => {
        if (!selectedSchedule) return {};

        const stats = selectedSchedule.id === "season"
            ? player.seasonAverages?.[selectedYear]?.[selectedSport]
            : player.Stats?.[selectedSchedule.id];

        return stats || {};  // Ensure it always returns an object
    };

    return (
        <div className="stats-container">
            <div className="stats">
                <div className="stats-menu">
                    <h3 className="stats-header">League Stats</h3>
                    <div className="stats-team-dropdown">
                        <TeamDropdown teams={teams} defaultTeamId="SELECT TEAM" onTeamChange={handleTeamChange} />

                    </div>
                    <div className="stats-button-row">
                        <div className="stats-date-dropdown">
                            <GameDropdown
                                games={[{ id: "season", name: `${selectedYear} Season` }, ...schedules]}
                                onGameChange={handleGameChange}
                                defaultGame={{ id: "season", name: `${selectedYear} Season` }}
                                value={selectedSchedule}
                            />
                        </div>
                        <div className="stats-sports-button-row">
                            {sportsIcon.map((sport) => (
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
                                    onClick={() => {
                                        setSelectedSport(sport.id);
                                        setSelectedSchedule({ id: "season", name: `${selectedYear} Season` });
                                    }}
                                    onMouseEnter={() => setHoveredSport(sport.id)}
                                    onMouseLeave={() => setHoveredSport(null)}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="stats-leaderboard-wrap">
                    <h4 className="stats-leaderboard-title">{selectedSport} - League Leaders</h4>
                    <div className="stats-leaderboard-row">
                        {Object.entries(getLeagueLeaders(players, selectedSport)).map(([stat, leader]) => (
                            <div key={stat} className="leaderboard-card">
                                <h5 className="stat-title">{stat}</h5>
                                <h4 className="leader-name">{leader.name}</h4>
                                <h2 className="leader-value">{leader.value}</h2>
                            </div>
                        ))}
                    </div>

                    <div className="stats-player-list">
                        {displayedStats.map((player) => {
                            const stats = getPlayerStats(player);
                            return (
                                <div key={player.id} className="player-card">
                                    <div className="player-info">
                                        <div className="top-row">
                                            <span className="player-name">{player.playerName}</span>
                                            <span className="player-team">
                                                {teams.find(t => t.id === player.teamID)?.abbrev || "Unknown"}
                                            </span>
                                        </div>
                                        <span className="player-stats">
                                            {Object.keys(stats).length > 0 ? (
                                                <div className="game-stats">
                                                    <p>
                                                        {statFields[selectedSport]
                                                            .map(stat => {
                                                                const key = stat; 
                                                                const value = stats[key] ?? 0;
                                                                {
                                                                    console.log("ABC:", "Stats List:", stats, "Key:", key, "Stat: ", value)
                                                                }
                                                                const numericValue = Number(value) || 0;
                                                                const displayValue = selectedSchedule.id === "season"
                                                                    ? numericValue.toFixed(2)  
                                                                    : Math.round(numericValue);

                                                                return `${displayValue} ${key.match(/\((.*?)\)/)?.[1] || stat}`;
                                                            })
                                                            .join(", ")
                                                        }
                                                    </p>
                                                </div>
                                            ) : (
                                                <p className="no-stats">No stats available for this game.</p>
                                            )}
                                        </span>
                                    </div>
                                    <div className="player-badges">
                                        <span className="badge">{player.Age} yrs</span>
                                        <span className="badge">{player.Height}</span>
                                    </div>
                                </div>
                            );
                        })}
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
