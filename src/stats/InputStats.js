import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, doc, getDocs, setDoc, updateDoc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import UltimateIcon from "../res/images/ic_ultimate.svg";
import SoftballIcon from "../res/images/ic_softball.svg";
import BasketballIcon from "../res/images/ic_basketball.svg";
import VolleyballIcon from "../res/images/ic_volleyball.svg";
import { BiSolidPencil, BiCheck } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
import DateDropdown from "../home/DateDropdown";
import TeamSelector from "./TeamSelector";
import "./stats.css";


const InputStats = () => {
    const sportIcons = {
        "Ultimate Frisbee": UltimateIcon,
        Softball: SoftballIcon,
        Basketball: BasketballIcon,
        Volleyball: VolleyballIcon,
    };

    const statFields = {
        Basketball: ["Points (PTS)", "Rebounds (REB)", "Assists (AST)", "Blocks (BLK)", "Steals (STL)"],
        Volleyball: ["Wins (W)", "Losses (L)", "Serves (SRV)"],
        Softball: ["Hits (H)", "At Bats (AB)", "Runs Batted In (RBI)"],
        "Ultimate Frisbee": ["Points (PTS)", "Assists (AST)", "Blocks (BLK)"],
    };

    const [players, setPlayers] = useState([]);
    const [teams, setTeams] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [selectedYear, setSelectedYear] = useState("2025");
    const [selectedMonth, setSelectedMonth] = useState(`${selectedYear} Season`);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [stats, setStats] = useState({});
    const [newPlayer, setNewPlayer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditingName, setIsEditingName] = useState(false);
    const [editedName, setEditedName] = useState("");
    const [editingStat, setEditingStat] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [playerPassword, setPlayerPassword] = useState("");
    const adminPassword = "1Corinthians12:12";  // ADMIN: NAV PASSWORD

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        fetchPlayers();
        fetchSchedules();
        fetchTeams();
    }, []);

    const fetchPlayers = async () => {
        const querySnapshot = await getDocs(collection(db, "players"));
        const playerList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPlayers(playerList);
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

        if (newPlayer) {
            setNewPlayer(prev => ({ ...prev, teamID: teamID }));
        }
    };

    const handleStatChange = (scheduleID, stat, value) => {
        if (isLoggedIn) {
            setStats((prevStats) => ({
                ...prevStats,
                [scheduleID]: {
                    ...prevStats[scheduleID],
                    [stat]: parseInt(value) || 0,
                },
            }));
        } else {
            alert("You must log in to edit stats.");
        }
    };

    const submitStats = async () => {
        if (!selectedPlayer) return alert("Please select a player.");
        if (!Object.keys(stats).length) return alert("No stats to submit."); // may not be needed

        const playerRef = doc(db, "players", selectedPlayer.id);
        const updatedStats = { ...selectedPlayer.Stats };

        Object.entries(stats).forEach(([scheduleID, statData]) => {
            const schedule = schedules.find(s => s.id === scheduleID);
            if (schedule) {
                updatedStats[scheduleID] = { sport: schedule.sport, ...statData };
            }
        });

        const seasonAverages = calculateSeasonAverages(updatedStats);

        await updateDoc(playerRef, { Stats: updatedStats, seasonAverages });
        alert("Stats updated successfully!");
        fetchPlayers();
    };

    const handlePlayerSelect = async (player) => {
        setSelectedPlayer(player);

        const updatedStats = {};

        schedules.forEach(schedule => {
            updatedStats[schedule.id] = player.Stats?.[schedule.id] || {};
        });

        setStats(updatedStats);
        setNewPlayer(null);
    };

    const startNewPlayer = () => {
        setNewPlayer({
            playerID: `player_${Date.now()}`,
            playerName: "",
            teamID: selectedTeam,
            Age: "",
            Height: "",
        });
        setSelectedPlayer(null);
    };

    const saveNewPlayer = async () => {
        if (!newPlayer.playerName || !newPlayer.Age || !newPlayer.Height || !newPlayer.teamID) {
            return alert("Please fill out all fields before saving.");
        }

        const playerRef = doc(db, "players", newPlayer.playerID);
        await setDoc(playerRef, newPlayer);

        alert("Player created successfully!");

        setPlayers([...players, newPlayer]);
        setSelectedPlayer(newPlayer);
        setNewPlayer(null);
    };

    const handleNameEdit = () => {
        setIsEditingName(true);
        setEditedName(selectedPlayer.playerName);
    };

    const saveNameEdit = async () => {
        if (!editedName.trim()) return; // Prevent saving empty names
        const playerRef = doc(db, "players", selectedPlayer.id);
        await updateDoc(playerRef, { playerName: editedName });
        setSelectedPlayer({ ...selectedPlayer, playerName: editedName });
        setIsEditingName(false);
    };

    const handleStatClick = (scheduleID, stat) => {
        setEditingStat({ scheduleID, stat });
    };

    const saveStatEdit = (scheduleID, stat, value) => {
        handleStatChange(scheduleID, stat, value);
        setEditingStat(null);
    };

    const calculateSeasonAverages = (playerStats) => {
        const yearlySportStats = {};

        Object.entries(playerStats).forEach(([gameID, gameData]) => {
            const { sport, ...stats } = gameData;
            const schedule = schedules.find(s => s.id === gameID);
            if (!schedule) return;

            const year = schedule.year;
            if (!yearlySportStats[year]) {
                yearlySportStats[year] = {};
            }
            if (!yearlySportStats[year][sport]) {
                yearlySportStats[year][sport] = { totalStats: {}, gameCounts: {}, gamesPlayed: 0 };
            }

            // Check if the game has at least one non-dash stat entry (i.e., valid stats input)
            const hasStats = Object.values(stats).some(val => val !== "-" && val !== 0 && val !== null && val !== undefined);
            if (hasStats) {
                yearlySportStats[year][sport].gamesPlayed += 1;
            }

            Object.entries(stats).forEach(([stat, value]) => {
                if (typeof value === "number") {
                    yearlySportStats[year][sport].totalStats[stat] =
                        (yearlySportStats[year][sport].totalStats[stat] || 0) + value;
                    yearlySportStats[year][sport].gameCounts[stat] =
                        (yearlySportStats[year][sport].gameCounts[stat] || 0) + 1;
                }
            });
        });

        const seasonAverages = {};
        Object.entries(yearlySportStats).forEach(([year, sports]) => {
            seasonAverages[year] = {};
            Object.entries(sports).forEach(([sport, data]) => {
                seasonAverages[year][sport] = {
                    "Games Played (GP)": data.gamesPlayed,
                };
                Object.keys(data.totalStats).forEach(stat => {
                    seasonAverages[year][sport][stat] = (data.totalStats[stat] / data.gameCounts[stat]).toFixed(1);
                });
            });
        });

        return seasonAverages;
    };

    const showPassword = () => {
        var pass = document.getElementById("new-player-password-prompt")
        if (pass.type === "password") {
            pass.type = "text";
        } else {
            pass.type = "password";
        }
    }

    const handlePasswordCheck = async (player) => {
        const storedPassword = sessionStorage.getItem(`password_${player.id}`);
        const playerRef = doc(db, "players", player.id);
        const playerSnap = await getDoc(playerRef);

        if (!playerSnap.exists()) {
            alert("Player not found.");
            return false;
        }

        setPlayerPassword(playerSnap.data().password);

        if (storedPassword === playerPassword || storedPassword === adminPassword) {
            setIsLoggedIn(true);
            return true;
        }

        const enteredPassword = window.prompt(`Enter password for ${player.playerName}:`);

        if (enteredPassword === playerPassword || enteredPassword === adminPassword) {
            sessionStorage.setItem(`password_${player.id}`, enteredPassword);
            setIsLoggedIn(true);
            return true;
        } else {
            alert("Swing and a Miss! Give it another go.");
            return false;
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem(`password_${selectedPlayer.id}`);
        setIsLoggedIn(false);
    };

    const deletePlayer = async () => {
        if (!selectedPlayer) return alert("No player selected.");
    
        const confirmDelete = window.confirm(`Are you sure you want to delete ${selectedPlayer.playerName}? There's no going back!`);
        if (!confirmDelete) return;
    
        try {
            // Delete from Firestore
            await deleteDoc(doc(db, "players", selectedPlayer.id));
    
            // Update local state
            setPlayers(players.filter(p => p.id !== selectedPlayer.id));
            setSelectedPlayer(null);
            alert("Player deleted successfully. Laytah!");
        } catch (error) {
            console.error("Error deleting player:", error);
            alert("There was an error deleting the player.");
        }
    };

    const filteredSchedules = selectedMonth === `${selectedYear} Season`
        ? schedules
        : schedules.filter(schedule => schedule.month.toLowerCase() === selectedMonth.toLowerCase());


    /*** COMPANION COMPONENT ***/
    const PillButton = ({ label, value, onSave }) => {
        const [isEditing, setIsEditing] = useState(false);
        const [inputValue, setInputValue] = useState(value || "-");

        const handleSave = () => {
            setIsEditing(false);
            onSave(inputValue);
        };

        return isEditing && isLoggedIn ? (
            <div className="pill-button-edit">
                <input
                    type="text"
                    className="input-player-stat-input"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    autoFocus
                />
                <button className="save-icon-button" onClick={handleSave}>
                    <BiCheck className="save-icon" />
                </button>
            </div>
        ) : isLoggedIn ? (
            <button className="input-player-stat-button" onClick={() => setIsEditing(true)}>
                <h4 className="input-player-stat-value">
                    {label}: {inputValue === "-" ? "-" : `${inputValue} ${label === "age" ? "yrs" : ""}`}
                </h4>
                <BiSolidPencil className="input-player-edit-icon" />
            </button>
        ) : (
            <div className="input-player-stat-button" >
                <h4 className="input-player-stat-value">
                    {label}: {inputValue === "-" ? "-" : `${inputValue} ${label === "age" ? "yrs" : ""}`}
                </h4>
            </div>
        );
    };


    /*** MAIN COMPONENT ***/
    return (
        <div className="input-stats-container">
            <div className="input-stats">
                <div className="input-stats-sidebar">
                    <Link to="/stats" className="exit-button-link">
                        <button className="exit-button"> Exit </button>
                    </Link>

                    <div className="input-stats-column">
                        <TeamSelector teams={teams} defaultTeamId="GEN1" onTeamChange={handleTeamChange} />
                        <ul className="input-player-list">
                            {players
                                .filter(player => !selectedTeam || player.teamID === selectedTeam)
                                .map((player) => (
                                    <li
                                        className={`input-player-item ${selectedPlayer?.id === player.id ? "active" : ""}`}
                                        key={player.id}
                                        onClick={() => handlePlayerSelect(player)}
                                    >
                                        <h4 className={`input-player-sidebar-name ${selectedPlayer?.id === player.id ? "active" : ""}`}>{player.playerName}</h4>
                                        <h5 className={`input-player-sidebar-team ${selectedPlayer?.id === player.id ? "active" : ""}`}>
                                            {teams.find(t => t.id === player.teamID)?.abbrev || "Unknown"}
                                        </h5>
                                    </li>
                                ))}
                        </ul>

                        <button className="input-add-player-button" onClick={startNewPlayer}>
                            <FaPlus className="input-add-icon" /> Add Player
                        </button>
                    </div>
                </div>

                <div className="input-stats-content">
                    {selectedPlayer ? (
                        <>
                            <div className="input-player-header">
                                <div className="input-player-info-column ">
                                    <h5 className="input-player-team">{teams.find(t => t.id === selectedPlayer.teamID)?.name || "Unknown"}</h5>
                                    <h1 className="input-player-name">
                                        {isEditingName && isLoggedIn ? (
                                            <div className="edit-player-name-row">
                                                <input
                                                    type="text"
                                                    className="input-edit-player-name"
                                                    value={editedName}
                                                    onChange={(e) => setEditedName(e.target.value)}
                                                    autoFocus
                                                    onKeyDown={(e) => e.key === "Enter" && saveNameEdit()}
                                                />
                                                <button className="save-icon-button" onClick={saveNameEdit}>
                                                    <BiCheck className="save-icon" />
                                                </button>
                                            </div>
                                        ) : isLoggedIn ? (
                                            <div className="edit-player-name-button" onClick={handleNameEdit}>
                                                {selectedPlayer.playerName}
                                                <BiSolidPencil className="edit-player-name-icon" />
                                            </div>
                                        ) : (
                                            <div className="edit-player-name-button">
                                                {selectedPlayer.playerName}
                                            </div>
                                        )}
                                    </h1>

                                    <div className="input-player-stat-button-row">
                                        <PillButton
                                            label="Age"
                                            value={selectedPlayer?.Age}
                                            onSave={(newValue) => {
                                                const updatedPlayer = { ...selectedPlayer, Age: newValue };
                                                setSelectedPlayer(updatedPlayer);
                                                updateDoc(doc(db, "players", selectedPlayer.id), { Age: newValue });
                                            }}
                                        />
                                        <PillButton
                                            label="Height"
                                            value={selectedPlayer?.Height}
                                            onSave={(newValue) => {
                                                const updatedPlayer = { ...selectedPlayer, Height: newValue };
                                                setSelectedPlayer(updatedPlayer);
                                                updateDoc(doc(db, "players", selectedPlayer.id), { Height: newValue });
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="input-stat-left-column">
                                    <div className="input-stat-date-dropdown">
                                        <DateDropdown
                                            months={["June", "July", "August", `${selectedYear} Season`]}
                                            defaultMonth={`${selectedYear} Season`}
                                            onMonthChange={setSelectedMonth}
                                        />
                                    </div>

                                    {isLoggedIn ? (
                                        <div className="input-stat-left-button-row">
                                            <div className="user-deletion">
                                                <button onClick={deletePlayer} className="user-delete-button"><h4>Delete Player</h4></button>
                                            </div>
                                            <div className="user-authorization">
                                                <button onClick={handleLogout} className="user-auth-login-button"><h4>Log Out</h4></button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="user-authorization">
                                            <button onClick={() => handlePasswordCheck(selectedPlayer)} className="user-auth-login-button"><h4>Log In</h4></button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Stats Input Sections */}
                            <div className="input-sport-stat-section">
                                {filteredSchedules.length > 0 ? (
                                    <div className="schedule-stats-list">
                                        {filteredSchedules.map(schedule => (
                                            <div className="input-sport-stat-card" key={schedule.id}>
                                                <div className="input-sport-stat-header">
                                                    <div className="input-sport-stat-header-left">
                                                        <img src={sportIcons[schedule.sport]} alt={`${schedule.sport} icon`} className="input-sport-stat-icon" />
                                                        <h2 className="input-sport-stat-title">{schedule.sport}</h2>
                                                    </div>
                                                    <p className="input-sport-stat-date">{schedule.date}</p>
                                                </div>
                                                <div className="input-sport-stat-row">
                                                    {statFields[schedule.sport]?.map(stat => (
                                                        <div key={stat} className="input-sport-stat-box" onClick={() => handleStatClick(schedule.id, stat)}>
                                                            <div className="input-sport-text-column">
                                                                <p className="input-sport-current-stat">{stat}</p>
                                                                <p className={`input-sport-edit-indicator ${isLoggedIn ? 'logged-in' : 'logged-out'}`}>Edit</p>
                                                            </div>
                                                            {editingStat?.scheduleID === schedule.id && editingStat?.stat === stat && isLoggedIn ? (
                                                                <input
                                                                    type="number"
                                                                    min={0}
                                                                    max={100}
                                                                    value={stats[schedule.id]?.[stat] || ""}
                                                                    onChange={(e) => handleStatChange(schedule.id, stat, e.target.value)}
                                                                    onBlur={() => saveStatEdit(schedule.id, stat, stats[schedule.id]?.[stat])}
                                                                    autoFocus
                                                                />
                                                            ) : (
                                                                <p className="input-sport-stat-display">
                                                                    {stats[schedule.id] && stats[schedule.id][stat] !== undefined ? stats[schedule.id][stat] : "-"}
                                                                </p>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p>No schedules found for the selected month.</p>
                                )}
                            </div>
                            <button className="save-stats-button" onClick={submitStats}>Save Stats</button>
                        </>
                    ) : newPlayer ? (
                        <div className="new-player-form">
                            <h2 className="new-player-title">Create New Player</h2>
                            <div className="new-player-header">
                                <input
                                    className="new-player-input-name"
                                    type="text"
                                    placeholder="Player Name"
                                    value={newPlayer.playerName}
                                    onChange={(e) => setNewPlayer({ ...newPlayer, playerName: e.target.value })}
                                />
                                <TeamSelector teams={teams} defaultTeamId="SELECT TEAM" onTeamChange={handleTeamChange} />
                                <div className="new-player-row">
                                    <PillButton
                                        label="Age"
                                        value={newPlayer.Age}
                                        onSave={(newValue) => setNewPlayer({ ...newPlayer, Age: newValue })}
                                    />
                                    <PillButton
                                        label="Height"
                                        value={newPlayer.Height}
                                        onSave={(newValue) => setNewPlayer({ ...newPlayer, Height: newValue })}
                                    />
                                </div>

                                <input
                                    id="new-player-password-prompt"
                                    className="new-player-password-prompt"
                                    type="password"
                                    value={newPlayer.password}
                                    onChange={(e) => setNewPlayer({ ...newPlayer, password: e.target.value })}
                                />

                                <div className="new-player-show-password-row">
                                    <input
                                        className="show-password-toggle1"
                                        type="checkbox"
                                        id="show-password-toggle"
                                        onClick={showPassword}
                                    />
                                    <label htmlFor="show-password-toggle" className="show-password-label">Show Password</label>
                                </div>
                                <button className="save-stats-button" onClick={saveNewPlayer}>Save Player</button>
                            </div>
                        </div>
                    ) : (
                        <p>Select or create a player to start editing.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InputStats;