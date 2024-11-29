import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, updateDoc, doc, addDoc } from "firebase/firestore";

import "./admin.css";

const Admin = () => {
    const [players, setPlayers] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [teams, setTeams] = useState([]);
    const [formData, setFormData] = useState({
        team: "",
        basketball: { gamesPlayed: 0, points: 0, rebounds: 0, assists: 0 },
        softball: { gamesPlayed: 0, atBats: 0, hits: 0, strikeOuts: 0, rbi: 0 },
        volleyball: { gamesPlayed: 0, wins: 0, losses: 0 },
        ultimate: { gamesPlayed: 0, points: 0, assists: 0, blocks: 0 },
    });
    const [newPlayerFormData, setNewPlayerFormData] = useState({
        playerName: "",
        team: "",
        basketball: { gamesPlayed: 0, points: 0, rebounds: 0, assists: 0 },
        softball: { gamesPlayed: 0, atBats: 0, hits: 0, strikeOuts: 0, rbi: 0 },
        volleyball: { gamesPlayed: 0, wins: 0, losses: 0 },
        ultimate: { gamesPlayed: 0, points: 0, assists: 0, blocks: 0 },
    });
    const [selectedSport, setSelectedSport] = useState("basketball");

    useEffect(() => {
        // Fetch players and teams from Firestore
        const fetchData = async () => {
            const playersRef = collection(db, "players");
            const teamsRef = collection(db, "teams");
            const [playerSnapshot, teamSnapshot] = await Promise.all([
                getDocs(playersRef),
                getDocs(teamsRef),
            ]);

            const playerList = playerSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            const teamList = teamSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setPlayers(playerList);
            setTeams(teamList);
        };

        fetchData();
    }, []);

    const handlePlayerSelect = (player) => {
        setSelectedPlayer(player.id);
        setFormData({
            playerName: player.playerName,
            team: player.teamID,
            ...player.stats,
        });
    };

    const handleInputChange = (e, sport, field) => {
        const { value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [sport]: {
                ...prevData[sport],
                [field]: parseFloat(value),
            },
        }));
    };

    const handleUpdate = async () => {
        if (!selectedPlayer) return;

        const playerDocRef = doc(db, "players", selectedPlayer);
        await updateDoc(playerDocRef, {
            teamID: formData.team,
            stats: {
                basketball: formData.basketball,
                softball: formData.softball,
                volleyball: formData.volleyball,
                ultimate: formData.ultimate,
            },
        });

        alert("Player stats updated successfully!");
    };

    const handleCreatePlayer = async () => {
        const newPlayer = {
            playerName: newPlayerFormData.playerName,
            teamID: newPlayerFormData.team,
            stats: {
                basketball: newPlayerFormData.basketball,
                softball: newPlayerFormData.softball,
                volleyball: newPlayerFormData.volleyball,
                ultimate: newPlayerFormData.ultimate,
            },
        };

        await addDoc(collection(db, "players"), newPlayer);
        alert("New player created successfully!");

        // Reset the new player form state
        setNewPlayerFormData({
            playerName: "",
            team: "",
            basketball: { gamesPlayed: 0, points: 0, rebounds: 0, assists: 0 },
            softball: { gamesPlayed: 0, atBats: 0, hits: 0, strikeOuts: 0, rbi: 0 },
            volleyball: { gamesPlayed: 0, wins: 0, losses: 0 },
            ultimate: { gamesPlayed: 0, points: 0, assists: 0, blocks: 0 },
        });
    };

    const formatKeyName = (key) => {
        if (key === ("rbi")) {
            key = "RBI"
        }

        return key
            .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space before uppercase letters
            .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
    };

    return (
        <div className="admin-page">
            <h2 className="admin-header">Admin Page - Manage Players</h2>

            {/* Player Selection */}
            <div className="admin-select">
                <label>Select Player:</label>
                <select
                    onChange={(e) => handlePlayerSelect(players.find(p => p.id === e.target.value))}
                >
                    <option value="">Select a player</option>
                    {players.map((player) => (
                        <option key={player.id} value={player.id}>
                            {player.playerName}
                        </option>
                    ))}
                </select>
            </div>

            {/* Sport Selection */}
            <div className="admin-select">
                <label>Select Sport:</label>
                <select value={selectedSport} onChange={(e) => setSelectedSport(e.target.value)}>
                    {sports.map((sport) => (
                        <option key={sport} value={sport}>
                            {sport.charAt(0).toUpperCase() + sport.slice(1)}
                        </option>
                    ))}
                </select>
            </div>

            {/* Stats Table */}
            {selectedPlayer && (
                <div className="admin-stats">
                    <h3>{formData.playerName}'s {selectedSport.charAt(0).toUpperCase() + selectedSport.slice(1)} Stats</h3>
                    <table>
                        <tbody>
                            {statOrder[selectedSport].map((field) => (
                                <tr key={field}>
                                    <td>{formatKeyName(field)}</td>
                                    <td>
                                        <input
                                            type="number"
                                            value={formData[selectedSport][field]}
                                            onChange={(e) => handleInputChange(e, selectedSport, field)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className="admin-button" onClick={handleUpdate}>Update Player</button>
                </div>
            )}

            {/* Create New Player */}
            <div className="admin-create-player">
                <h3>Create New Player</h3>
                <label>Player Name:</label>
                <input
                    type="text"
                    value={newPlayerFormData.playerName}
                    onChange={(e) => setNewPlayerFormData({ ...newPlayerFormData, playerName: e.target.value })}
                />
                <label>Team:</label>
                <select
                    value={newPlayerFormData.team}
                    onChange={(e) => setNewPlayerFormData({ ...newPlayerFormData, team: e.target.value })}
                >
                    <option value="">Select a team</option>
                    {teams.map((team) => (
                        <option key={team.id} value={team.id}>
                            {team.teamName}
                        </option>
                    ))}
                </select>
                <button className="admin-button" onClick={handleCreatePlayer}>Create Player</button>
            </div>
        </div>
    );
};

export default Admin;


const sports = ["basketball", "softball", "volleyball", "ultimate"];
const statOrder = {
    basketball: ["gamesPlayed", "points", "rebounds", "assists"],
    softball: ["gamesPlayed", "atBats", "hits", "strikeOuts", "rbi"],
    volleyball: ["gamesPlayed", "wins", "losses"],
    ultimate: ["gamesPlayed", "points", "assists", "blocks"],
};
