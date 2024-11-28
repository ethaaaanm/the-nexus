import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, updateDoc, doc, addDoc } from "firebase/firestore";

const AdminPage = () => {
    const [players, setPlayers] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [formData, setFormData] = useState({
        playerName: "",
        team: "QroebDFEGvrmBkwLo7dy",
        basketball: { gamesPlayed: 0, points: 0, rebounds: 0, assists: 0 },
        softball: { gamesPlayed: 0, atBats: 0, hits: 0, strikeOuts: 0 },
        volleyball: { gamesPlayed: 0, wins: 0, losses: 0 },
        ultimate: { gamesPlayed: 0, points: 0, assists: 0, blocks: 0 },
    });
    const [selectedSport, setSelectedSport] = useState("basketball");

    useEffect(() => {
        const fetchPlayers = async () => {
            const playersRef = collection(db, "players");
            const playerSnapshot = await getDocs(playersRef);
            const playerList = playerSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setPlayers(playerList);
        };

        fetchPlayers();
    }, []);

    const handlePlayerSelect = (player) => {
        setSelectedPlayer(player.id);
        setFormData({
            playerName: player.playerName,
            team: player.team,
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
        await updateDoc(playerDocRef, { stats: { ...formData } });

        alert("Player stats updated successfully!");
    };

    const handleCreatePlayer = async () => {
        const newPlayer = {
            playerName: formData.playerName,
            team: formData.team,
            stats: {
                basketball: { gamesPlayed: 0, points: 0, rebounds: 0, assists: 0 },
                softball: { gamesPlayed: 0, atBats: 0, hits: 0, strikeOuts: 0, rbi: 0 },
                volleyball: { gamesPlayed: 0, wins: 0, losses: 0 },
                ultimate: { gamesPlayed: 0, points: 0, assists: 0, blocks: 0 },
            },
        };

        await addDoc(collection(db, "players"), newPlayer);
        alert("New player created successfully!");
        setFormData({
            playerName: "",
            team: "",
            basketball: { gamesPlayed: 0, points: 0, rebounds: 0, assists: 0 },
            softball: { gamesPlayed: 0, atBats: 0, hits: 0, strikeOuts: 0, rbi: 0 },
            volleyball: { gamesPlayed: 0, wins: 0, losses: 0 },
            ultimate: { gamesPlayed: 0, points: 0, assists: 0, blocks: 0 },
        });
    };

    const sports = ["basketball", "softball", "volleyball", "ultimate"];

    return (
        <div className="admin-page">
            <h2>Admin Page - Update Player Stats</h2>

            {/* Player Selection */}
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

            {/* Sport Selection */}
            <div>
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
                <div>
                    <h3>{formData.playerName}'s {selectedSport.charAt(0).toUpperCase() + selectedSport.slice(1)} Stats</h3>
                    <table>
                        <tbody>
                            {Object.keys(formData[selectedSport]).map((field) => (
                                <tr key={field}>
                                    <td>{field}</td>
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
                    <button onClick={handleUpdate}>Update Stats</button>
                </div>
            )}

            {/* Create New Player */}
            <div>
                <h3>Create New Player</h3>
                <label>Player Name:</label>
                <input
                    type="text"
                    value={formData.playerName}
                    onChange={(e) => setFormData({ ...formData, playerName: e.target.value })}
                />
                <label>Team ID:</label>
                <input
                    type="text"
                    value={formData.team}
                    onChange={(e) => setFormData({ ...formData, team: e.target.value })}
                />
                <button onClick={handleCreatePlayer}>Create Player</button>
            </div>
        </div>
    );
};

export default AdminPage;