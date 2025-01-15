import React from "react";
import TeamDropdown from "./TeamDropdown";
import CurrentTeams from "../components/currentTeams";

import UltimateIcon from "../res/images/ic_ultimate.svg";
import SoftballIcon from "../res/images/ic_softball.svg";
import BasketballIcon from "../res/images/ic_basketball.svg";
import VolleyballIcon from "../res/images/ic_volleyball.svg";

import "./stats.css";

const Stats = () => {
    return (
    <div className="stats-container">
        <div className="stats">
            <div className="stats-menu">
                <h3 className="stats-header">League Stats</h3>
                <CurrentTeams/>
                <div className="header-row">
                    <div className="stats-dropdown">
                    <TeamDropdown
                        teams={["GENESIS", "REFINED", "ALL TEAMS"]}
                        defaultTeam="GENESIS"
                        onTeamChange={{}}
                    />
                    </div>         
                    <div className="icon-row">
                        <img src={UltimateIcon} className="sport-button" alt="ultimate frisbee button"/>
                        <img src={BasketballIcon} className="sport-button" alt="basketball button"/>
                        <img src={VolleyballIcon} className="sport-button" alt="volleyball button"/>
                        <img src={SoftballIcon} className="sport-button" alt="softball button"/>
                    </div>       
                </div>
            </div>
        </div>
    </div>
    );
};

export default Stats;