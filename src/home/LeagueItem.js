import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
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

const LeagueItem = ({ sport, topPlayers = [] }) => {
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeams = async () => {
      const querySnapshot = await getDocs(collection(db, "teams"));
      setTeams(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchTeams();
  }, []);

  // Define stat categories for display
  const sportStatCategories = {
    Basketball: ["GP", "PTS", "AST", "REB", "STL", "BLK"],
    "Ultimate Frisbee": ["GP", "PTS", "AST", "BLK"],
    Softball: ["GP", "H", "AB", "RBI"],
    Volleyball: ["GP", "W", "L", "SRV"],
  };

  useEffect(() => {
    console.log("Received topPlayers for", sport, ":", topPlayers);
  }, [topPlayers]);

  return (
    <div className="league-item">
      <div className="row-top">
        <div className="sport-title-wrapper">
          <img src={sportIcons[sport]} alt={`${sport} icon`} className="sport-icon" />
          <h3 className="sport-title">{sport} Leaders</h3>
        </div>
      </div>

      <div className="player-list1">
        {topPlayers.length > 0 ? (
          topPlayers.map((player, index) => {
            const teamAbrev = teams.find(t => t.id === player.teamID)?.abbrev || "Unknown";

            return (
              <div key={index} className="player-row">
                <div className="rank">{index+1}</div>
                <div className="player-info">
                  <div className="top-row">
                    <span className="player-name">{player.playerName}</span>
                    <span className="player-team">{teamAbrev}</span>
                  </div>
                  <span className="player-stat">
                    {sportStatCategories[sport]
                      .map((stat) => `${player.stats[stat] || 0} ${stat}`)
                      .join(", ")}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <p>No stats available</p>
        )}
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
