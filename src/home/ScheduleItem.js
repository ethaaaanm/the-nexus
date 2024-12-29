import React from "react";
import UltimateIcon from "../res/images/ic_ultimate.svg";
import SoftballIcon from "../res/images/ic_softball.svg";
import BasketballIcon from "../res/images/ic_basketball.svg";
import VolleyballIcon from "../res/images/ic_volleyball.svg"
import "./home.css";

const sportIcons = {
    "Ultimate Frisbee": UltimateIcon,
    "Softball": SoftballIcon,
    "Basketball": BasketballIcon,
    "Volleyball": VolleyballIcon
}

const ScheduleItem = ({ sport, date, teams }) => (
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
                {teams.map((team, index) => (
                    <div className="team-row" key={index}>
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
            {/* Play Button */}
            <button className="play-button">▶</button>
            </div>
        </div>
    </div>
);

export default ScheduleItem;