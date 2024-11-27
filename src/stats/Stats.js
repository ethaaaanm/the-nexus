import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import './stats.css';

import SportSelection from "../components/SportsSelection";
import SoftballStats from "../components/SoftballStats";
import BasketballStats from "../components/BasketballStats";
import VolleyballStats from "../components/VolleyballStats";
import UltimateStats from "../components/UltimateStats";

const Stats = () => {
  const [selectedSport, setSelectedSport] = useState("Basketball");
  const [playerStats, setPlayerStats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const playersRef = collection(db, "players");
      const playerSnapshot = await getDocs(playersRef);

      const stats = playerSnapshot.docs.map((doc) => {
        const data = doc.data();
        const playerStats = {
          playerName: data.playerName || "-",
          teamId: data.team_id || "-",
          ...data.stats[selectedSport.toLowerCase()],
        };

        if (selectedSport === "Softball") {
          playerStats.battingAverage = data.stats.softball
            ? ((playerStats.hits / playerStats.atBats) * 100 || 0).toFixed(2)
            : "-";
        }

        if (selectedSport === "Volleyball") {
          playerStats.winPercentage = data.stats.volleyball
            ? ((playerStats.wins / playerStats.gamesPlayed) * 100 || 0).toFixed(2)
            : "-";
        }

        for (let key in playerStats) {
          if (playerStats[key] === null || playerStats[key] === undefined) {
            playerStats[key] = "-";
          }
        }

        return playerStats;
      });

      setPlayerStats(stats);
    };

    fetchData();
  }, [selectedSport]);

  return (
    <div id="stats">
      <h1 id="stat-title">The Nexus League - Player Stats</h1>
      <div className="sport-selection">
        <SportSelection onSelectSport={setSelectedSport} />
      </div>
      <div style={{ marginTop: "20px" }}>
        {selectedSport === "Basketball" && <BasketballStats playerStats={playerStats} />}
        {selectedSport === "Softball" && <SoftballStats playerStats={playerStats} />}
        {selectedSport === "Volleyball" && <VolleyballStats playerStats={playerStats} />}
        {selectedSport === "Ultimate" && <UltimateStats playerStats={playerStats} />}
      </div>
    </div>
  );
};

export default Stats;