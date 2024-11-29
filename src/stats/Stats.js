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
  const [teamAStats, setTeamAStats] = useState([]);
  const [teamBStats, setTeamBStats] = useState([]);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      const teamsRef = collection(db, "teams");
      const teamSnapshot = await getDocs(teamsRef);

      const teamData = teamSnapshot.docs.map((doc) => ({
        teamID: doc.id,
        ...doc.data(),
      }));

      setTeams(teamData);
    };

    fetchTeams();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const playersRef = collection(db, "players");
      const playerSnapshot = await getDocs(playersRef);

      const teamAId = teams[0]?.teamID; // Assuming the first team for simplicity
      const teamBId = teams[1]?.teamID; // Assuming the second team for simplicity

      const teamAStats = [];
      const teamBStats = [];

      playerSnapshot.docs.forEach((doc) => {
        const data = doc.data();
        const playerStats = {
          playerName: data.playerName || "-",
          teamId: data.teamID || "-",
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

        if (playerStats.teamId === teamAId) {
          teamAStats.push(playerStats);
        } else if (playerStats.teamId === teamBId) {
          teamBStats.push(playerStats);
        }
      });

      setTeamAStats(teamAStats);
      setTeamBStats(teamBStats);
    };

    if (teams.length > 0) {
      fetchData();
    }
  }, [selectedSport, teams]);

  return (
    <div id="stats">
      <h1 id="stat-title">Player Stats</h1>
      <div className="sport-selection">
        <SportSelection onSelectSport={setSelectedSport} />
      </div>
      <div style={{ marginTop: "20px" }}>
        <h2>Big Binguses</h2>
        {selectedSport === "Basketball" && <BasketballStats playerStats={teamAStats} />}
        {selectedSport === "Softball" && <SoftballStats playerStats={teamAStats} />}
        {selectedSport === "Volleyball" && <VolleyballStats playerStats={teamAStats} />}
        {selectedSport === "Ultimate" && <UltimateStats playerStats={teamAStats} />}

        <h2>Hugussies</h2>
        {selectedSport === "Basketball" && <BasketballStats playerStats={teamBStats} />}
        {selectedSport === "Softball" && <SoftballStats playerStats={teamBStats} />}
        {selectedSport === "Volleyball" && <VolleyballStats playerStats={teamBStats} />}
        {selectedSport === "Ultimate" && <UltimateStats playerStats={teamBStats} />}
      </div>
    </div>
  );
};

export default Stats;