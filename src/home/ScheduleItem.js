import React, { useEffect, useState } from "react";
import { homeTeamDB } from "../data/homeData"; 
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
    }

    fetchTeamDetails();
  }, [teams])

  const getLosingTeam = () => {
    if (teams[0].score < teams[1].score) {
      return 0;
    } else if (teams[0].score > teams[1].score) {
      return 1;
    } else {
      return -1;
    }
  }

  const losingTeam = getLosingTeam();

  return (
    <div className="schedule-item">
      <div className="schedule-item-content">
        {/* Row 1: Sport Title and Date */}
        <div className="row-top">
          <div className="sport-title-wrapper">
            <img src={sportIcons[sport]} alt={`${sport} icon`} className="sport-icon" />
            <h3 className="sport-title">{sport}</h3>
          </div>
          <p className="schedule-date">{date}</p>
        </div>

        {/* Row 2: Team Info */}
        <div className="row-bottom">
          <div className="teams-info">
            {teamData.map((team, index) => (
              team ? (
                <div className="team-bar">
                  {teams[index].score && (
                <div className={`team-score-background ${losingTeam === index ? "team-loser" : losingTeam === -1 ? "team-draw" : ""}`}>
                      <p className="team-score">{teams[index].score}</p>
                    </div>
                  )}
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
              <FaPlay className="play-icon"/>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScheduleItem;