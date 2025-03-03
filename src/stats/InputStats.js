import { React, useState } from "react";
import { Link } from "react-router-dom";
import UltimateIcon from "../res/images/ic_ultimate.svg";
import SoftballIcon from "../res/images/ic_softball.svg";
import BasketballIcon from "../res/images/ic_basketball.svg"
import VolleyballIcon from "../res/images/ic_volleyball.svg"
import TeamDropdown from "./TeamDropdown";

import { teamDB } from "../data/teamData";

import "./stats.css";

const InputStats = () => {
    const handleTeamChange = (team) => {
        console.log("Selected team:", team);
    };

    return (
        <div className="input-stats-container">
            <div className="input-stats">
                <Link to="/stats">
                    <button className="exit-input-stats">Exit</button>
                </Link>
                <TeamDropdown
                    teams={teamDB} // no ALL TEAMS
                    defaultTeamId="G1" 
                    onTeamChange={handleTeamChange}
                />
            </div>
        </div>

    );
};

export default InputStats;