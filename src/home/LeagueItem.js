import React from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

import "./home.css";

import UltimateIcon from "../res/images/ic_ultimate.svg";
import SoftballIcon from "../res/images/ic_softball.svg";
import BasketballIcon from "../res/images/ic_basketball.svg";
import VolleyballIcon from "../res/images/ic_volleyball.svg";

const sportIcons = {
  "Ultimate Frisbee": UltimateIcon,
  Softball: SoftballIcon,
  Basketball: BasketballIcon,
  Volleyball: VolleyballIcon,
};

// Function to calculate stats for a sport
const calculateStats = (sport, stats) => {
  switch (sport) {
    case "Ultimate Frisbee":
      return `${stats.points.reduce((a, b) => a + b, 0)} PTS, ${stats.assists.reduce(
        (a, b) => a + b,
        0
      )} AST, ${stats.blocks.reduce((a, b) => a + b, 0)} BLK`;

    case "Basketball":
      return `${stats.points.reduce((a, b) => a + b, 0)} PTS, ${stats.assists.reduce(
        (a, b) => a + b,
        0
      )} AST, ${stats.rebounds.reduce((a, b) => a + b, 0)} REB`;

    case "Softball":
      return `${stats.hits.reduce((a, b) => a + b, 0)} HIT, ${stats.strikeouts.reduce(
        (a, b) => a + b,
        0
      )} STK, ${stats.rbi.reduce((a, b) => a + b, 0)} RBI`;

    case "Volleyball":
      return `${stats.wins} WIN, ${stats.losses} LOSS`;

    default:
      return "No stats available";
  }
};

const LeagueItem = ({ sport, sportsStatsDB }) => {
  // Extract player data for the given sport
  const players = Object.entries(sportsStatsDB.Players).map(([name, data]) => {
    const stats = data[sport];
    return stats
      ? {
          name,
          team: data.Team,
          abbrev: data.Abbrev,
          stats: calculateStats(sport, stats),
        }
      : null;
  });

  // Sort players if needed, e.g., by points for Ultimate Frisbee
  const sortedPlayers = players.filter(Boolean); // Remove null values
  // Optional sorting logic depending on sport
  // sortedPlayers.sort((a, b) => b.stats.points - a.stats.points); // Add custom logic if needed
  const navigate = useNavigate();

  return (
    <div className="league-item">
      {/* Row Top: Sport Title */}
      <div className="row-top">
        <div className="sport-title-wrapper">
          <img
            src={sportIcons[sport]}
            alt={`${sport} icon`}
            className="sport-icon"
          />
          <h3 className="sport-title">{sport}</h3>
        </div>
      </div>

      {/* Players List */}
      <div className="player-list">
        {sortedPlayers.map((player, index) => (
          <div key={index} className="player-row">
            <p className="rank">{index + 1}</p>
            <div className="player-info">
                <div className="top-row">
                    <span className="player-name">{player.name}</span>
                    <span className="player-team">{player.abbrev}</span>
                </div>
                <div className="bottom-row">
                    <p className="player-stats">{player.stats}</p>
                </div>
            </div>
          </div>
        ))}
      </div>

      {/* See All Button */}
      <div className="see-all-wrapper">
        <button className="see-all-button" 
          onClick={() => {
            navigate("/stats");      
            window.scrollTo(0, 0); 
          }}>
          See All 
          <IoIosArrowForward className="arrow-icon" />
        </button>
      </div>
    </div>
  );
};

export default LeagueItem;
