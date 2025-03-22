import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Adjust based on your project structure
import "./stats.css"; // Add CSS for styling

const StatsPage = () => {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPlayers();
    }, []);

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

    if (loading) {
        return <p>Loading stats...</p>;
    }

    return (
        <div className="stats-container">
            <h1 className="stats-title">Player Statistics</h1>
            {players.map((player) => (
                <div key={player.id} className="player-card">
                    <h2 className="player-name">{player.playerName}</h2>
                    <p className="player-team">Team: {player.teamID || "Unknown"}</p>

                    {/* Display per-game stats */}
                    {player.Stats && Object.keys(player.Stats).length > 0 ? (
                        Object.entries(player.Stats).map(([gameID, gameData]) => (
                            <div key={gameID} className="game-stats">
                                <h3 className="game-title">{gameData.sport}</h3>
                                <div className="stat-list">
                                    {Object.entries(gameData)
                                        .filter(([key]) => key !== "sport")
                                        .map(([stat, value]) => (
                                            <p key={stat} className="stat-item">
                                                <strong>{stat}:</strong> {value}
                                            </p>
                                        ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="no-stats">No stats available.</p>
                    )}

                    {/* Display Season Averages */}
                    {player.seasonAverages && Object.keys(player.seasonAverages).length > 0 ? (
                        <div className="season-averages">
                            <h3 className="average-title">Season Averages</h3>
                            {Object.entries(player.seasonAverages).map(([year, averages]) => (
                                <div key={year} className="average-block">
                                    <h4>{year} Season</h4>
                                    <div className="average-list">
                                        {Object.entries(averages).map(([stat, value]) => (
                                            <p key={stat} className="average-item">
                                                <strong>{stat}:</strong> {value}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="no-averages">No season averages available.</p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default StatsPage;
