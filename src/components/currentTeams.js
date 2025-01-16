import React from "react";
import { homeTeamDB } from "../data/homeData.js";
import "../home/Home.js"

const CurrentTeams = () => (
    <div className="current-teams">
      {homeTeamDB.map((team) => (
        <div className="team-row" key={team.id}>
          <img src={team.icon} alt={`${team.name} logo`} className="team-icon" />
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
  
  export default CurrentTeams;