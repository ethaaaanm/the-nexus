import {React, useState } from "react";
import TeamDropdown from "./TeamDropdown";
import DateDropdown from "../home/DateDropdown";
import UltimateIcon from "../res/images/ic_ultimate.svg";
import SoftballIcon from "../res/images/ic_softball.svg";
import BasketballIcon from "../res/images/ic_basketball.svg";
import VolleyballIcon from "../res/images/ic_volleyball.svg";
import { teamDB } from "../data/teamData"; 

import "./stats.css";


const Stats = () => {
    const handleTeamChange = (team) => {
        console.log("Selected team:", team);
    };

    const [selectedMonth, setSelectedMonth] = useState("JUNE"); // Track selected month
    const [selectedYear, setSelectedYear] = useState(2025);

    return (
        <div className="stats-container">
            <div className="stats">
                <div className="stats-menu">
                    <h3 className="stats-header">League Stats</h3>
                    <div className="stats-team-dropdown">
                        <TeamDropdown
                            teams={teamDB}  
                            defaultTeamId="G1"
                            onTeamChange={handleTeamChange}
                        />
                    </div>
                    <div className="stats-button-row">
                        <div className="stats-date-dropdown">
                              <DateDropdown
                                months={["JUNE", "JULY", "AUGUST", `${selectedYear} SEASON`]}
                                defaultMonth={`${selectedYear} SEASON`}
                                onMonthChange={setSelectedMonth}
                            />
                        </div>
                        <div className="sports-button-row">
                            <img src={UltimateIcon} className="Stat-Sport-Button" alt="Ultimate Frisbee Button"/>
                            <img src={BasketballIcon} className="Stat-Sport-Button" alt="Basketball Button"/>
                            <img src={VolleyballIcon} className="Stat-Sport-Button" alt="Volleyball Button"/>
                            <img src={SoftballIcon} className="Stat-Sport-Button" alt="Softball Button"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stats;
