import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Refined from "../res/images/team_refined.svg";
import Genesis from "../res/images/team_genesis.svg";

import "../home/home.css";

const teamIcons = {
  genesis: Genesis,
  refined: Refined,
};

const parseRecord = (record) => {
  const [wins, losses, ties] = record.split("-").map(Number);
  return { wins, losses, ties };
};

const findLosingTeam = (teams) => {
  if (teams.length < 2) return null;

  const [team1, team2] = teams;
  const record1 = parseRecord(team1.record);
  const record2 = parseRecord(team2.record);

  // Determine worse team based on wins and losses
  if (record1.wins < record2.wins) return team1.id;
  if (record2.wins < record1.wins) return team2.id;
  if (record1.losses > record2.losses) return team1.id;
  if (record2.losses > record1.losses) return team2.id;

  return null; // If records are identical
};

const CurrentTeams = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "teams"));
        const fetchedTeams = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTeams(fetchedTeams);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, []);

  const losingTeamId = findLosingTeam(teams);

  return (
    <div className="current-teams">
      {teams.map((team) => (
        <div
          key={team.id}
          className={`team-row ${team.id === losingTeamId ? "losing-team" : ""}`}
        >
          <img
            src={teamIcons[team.name.toLowerCase()] || "default-icon.png"}
            alt={`${team.name} logo`}
            className="team-icon"
          />
          <div className="team-details">
            <div className="team-info-row">
              <p className="team-name">{team.name}</p>
              <p className="team-abbrev">{team.abbrev}</p>
            </div>
            <p className="team-record">{team.record}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CurrentTeams;
