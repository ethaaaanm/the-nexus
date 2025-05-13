import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig"
import { doc, getDoc } from "firebase/firestore"
import UltimateIcon from "../res/images/ic_ultimate.svg";
import SoftballIcon from "../res/images/ic_softball.svg";
import BasketballIcon from "../res/images/ic_basketball.svg";
import VolleyballIcon from "../res/images/ic_volleyball.svg";
import Refined from "../res/images/team_refined.svg";
import Genesis from "../res/images/team_genesis.svg";
import { FaPlay } from "react-icons/fa";

import "./home.css";

const sportIcons = {
  "Ultimate Frisbee": UltimateIcon,
  Softball: SoftballIcon,
  Basketball: BasketballIcon,
  Volleyball: VolleyballIcon,
};

const teamIcons = {
  genesis: Genesis,
  refined: Refined,
};

const ScheduleItem = ({ sport, date, teams, video }) => {
  const [teamData, setTeamData] = useState([null, null])


  useEffect(() => {
    const fetchTeamData = async (teamId) => {
      const teamRef = doc(db, "teams", teamId);
      const teamSnap = await getDoc(teamRef);
      if (teamSnap.exists()) {
        return teamSnap.data();
      } else {
        console.error("No teams Found");
        return null;
      }
    };

    const fetchTeamDetails = async () => {
      const team1Data = await fetchTeamData(teams[0].id);
      const team2Data = await fetchTeamData(teams[1].id);
      setTeamData([team1Data, team2Data]);
    };

    fetchTeamDetails();
  }, [teams]);

  const parseRecord = (recordString) => {
    if (!recordString) return { wins: 0, losses: 0, ties: 0 }; // Default if null or empty
    const [wins, losses, ties] = recordString.split("-").map(Number);
    return { wins: wins || 0, losses: losses || 0, ties: ties || 0 };
  };

  const getLosingTeam = () => {
    if (!teamData[0] || !teamData[1]) return null; // Ensure both teams exist

    const record1 = parseRecord(teams[0].recordAtTime || teamData[0].record);
    const record2 = parseRecord(teams[1].recordAtTime || teamData[1].record);

    if (record1.wins < record2.wins) return 0;
    if (record2.wins < record1.wins) return 1;
    if (record1.losses > record2.losses) return 0;
    if (record2.losses > record1.losses) return 1;

    return -1; // Tie
  };

  const losingTeam = getLosingTeam();

  return (
    <div className="schedule-item">
      <div className="schedule-item-content">
        {/* Row 1: Sport Title and Date */}
        <div className="row-top">
          <div className="sport-title-wrapper">
            <img src={sportIcons[sport]} alt={`${sport} icon`} className="sport-icon" />
            <div className="sport-title-mobile">
              <h3 className="sport-title">{sport}</h3>
              <h4 className="schedule-date-mobile">{date}</h4>
            </div>
          </div>
          <p className="schedule-date">{date}</p>
        </div>

        {/* Row 2: Team Info */}
        <div className="row-bottom">
          <div className="teams-info">
            {teamData.map((team, index) => (
              team ? (
                <div className="team-bar">
                  <div className={`team-row ${losingTeam === index ? "team-loser" : losingTeam === -1 ? "team-draw" : ""}`} key={team.id}>
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
                      <p className="team-record">
                        {teams[index].recordAtTime || team.record}
                      </p>
                    </div>
                  </div>
                  {teams[index].scores && teams[index].scores.length > 0 && (
                    <div className="team-score-row">
                      {teams[index].scores.map((score, scoreIndex) => (
                        <p key={scoreIndex} className={`team-score ${losingTeam === index ? "team-loser" : losingTeam === -1 ? "team-draw" : ""}`}>{score}</p>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="team-row" key={index}>
                  <p>Team not found</p>
                </div>
              )
            ))}
          </div>
          {/* Play Button */}
          {video && (
            <button className="play-button" onClick={() => window.open(video, "_blank")}>
              <FaPlay className="play-icon" />
            </button>
          )}
        </div>
        {/* Play Button */}
        {video && (
          <button className="play-button-mobile" onClick={() => window.open(video, "_blank")}>
            <FaPlay className="play-icon" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ScheduleItem;