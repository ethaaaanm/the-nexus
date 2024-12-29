import React, { useState } from "react";
import Dropdown from "./dropdown"; 

import Wordmark from "../res/images/wordmark_green.svg";
import FrisbeeIcon from "../res/images/ic_ultimate.svg"; 
import SoftballIcon from "../res/images/ic_softball.svg";
import BasketballIcon from "../res/images/ic_basketball.svg";
import VolleyballIcon from "../res/images/ic_volleyball.svg"
import "./home.css"; 

// Data for the news section
const newsData = [
  {
    title: "Next Game Location",
    content: "Our next game will be hosted at People's Christian Academy, Renfrew Dr, Markham.",
    date: "6/4/2025",
  },
  {
    title: "Game Recording",
    content: "Watch the recording on our YouTube channel: @TheNexus-League",
  },
  {
    title: "Congrats to Team Genesis!",
    content: "For winning the first-ever game of The Nexus!",
  },
  {
    content: "You're all caught up on the news of The Nexus"
  }
];

// Full schedule data
const fullScheduleData = [
  {
    sport: "Ultimate Frisbee",
    date: "6/4/2025 | 7:00PM",
    teams: ["Genesis 1-0-0", "Refined 0-1-0"],
    month: "JUNE",
  },
  {
    sport: "Softball",
    date: "6/11/2025 | 7:00PM",
    teams: ["Genesis 0-0-0", "Refined 0-0-0"],
    month: "JUNE",
  },
  {
    sport: "Basketball",
    date: "7/1/2025 | 7:00PM",
    teams: ["Genesis 0-0-1", "Refined 1-0-0"],
    month: "JULY",
  },
];

const sportIcons = {
  "Ultimate Frisbee": FrisbeeIcon,
  "Softball": SoftballIcon,
  "Basketball": BasketballIcon,
  "Volleyball": VolleyballIcon
}

// Schedule Items
const ScheduleItem = ({ sport, date, teams}) => (
  <div className="schedule-item">
    <div className="schedule-item-content">
      <h3 className="sport-title">{sport}</h3>
      <p className="schedule-date">{date}</p>
      <p className="team-info">{teams.join(" vs ")}</p>
    </div>
    <button className="play-button">▶</button>
  </div>
)

const Home = () => {
  const [selectedMonth, setSelectedMonth] = useState("JUNE"); // State to track selected month
  const filteredSchedule = fullScheduleData.filter((item) => item.month === selectedMonth);

  return (
    <div className="home">
      {/* Top Left: Title Logo */}
      <div className="title-logo">
        <img src={Wordmark} alt="The Nexus Title" />
      </div>

      {/* Top Right: Schedule Dropdown */}
      <div className="schedule-dropdown">
        <h3>Schedule</h3>
        <Dropdown
          months={["JUNE", "JULY", "AUGUST"]} // Available months
          defaultMonth="JUNE" // Default selected month
          onMonthChange={setSelectedMonth} // Function to update the selected month
        />
      </div>

       {/* Bottom Left: News Section */}
       <div className="news-section">
        <h2>News</h2>
        {newsData.map((item, index) => (
          <div className="news-item" key={index}>
            <h3>{item.title}</h3>
            {item.date && <p className="news-date">{item.date}</p>}
            <p>
              {/* For the last child, bold "The Nexus" */}
              {index === newsData.length - 1 ? (
                <>
                  {item.content.split("The Nexus").map((part, i, arr) => (
                    <React.Fragment key={i}>
                      {part}
                      {i < arr.length - 1 && <strong>The Nexus</strong>}
                    </React.Fragment>
                  ))}
                </>
              ) : // For the YouTube channel link
              item.content.includes("@TheNexus-League") ? (
                <>
                  {item.content.split("@TheNexus-League")[0]}
                  <a
                    href="https://www.youtube.com/@TheNexus-League" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="youtube-link"
                  >
                    @TheNexus-League
                  </a>
                </>
              ) : (
                item.content
              )}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom Right: Schedule Section */}
      <div className="schedule-section">
        <h2>Schedule</h2>
        {filteredSchedule.map((item, index) => (
            <ScheduleItem
              key={index}
              sport={item.sport}
              date={item.date}
              teams={item.teams}
            />
        ))}
      </div>
    </div>
  );
};

export default Home;