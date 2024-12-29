import React, { useState } from "react";
import Dropdown from "./Dropdown"; 
import ScheduleItem from "./ScheduleItem";

import Wordmark from "../res/images/wordmark_green.svg";
import Genesis from "../res/images/team_genesis.svg";
import Refined from "../res/images/team_refined.svg"
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
    month: "JUNE",
    sport: "Basketball",
    date: "6/4 | 7:00PM",
    teams: [
      {
        icon: Genesis,
        name: "Genesis",
        abbrev: "GEN",
        record: "1-0-0",
      },
      {
        icon: Refined,
        name: "Refined",
        abbrev: "REF",
        record: "0-1-0",
      },
    ],
  },
  {
    month: "JUNE",
    sport: "Softball",
    date: "June 15, 2024",
    teams: [
      {
        icon: Genesis,
        name: "Genesis",
        abbrev: "GEN",
        record: "1-1-0",
      },
      {
        icon: Refined,
        name: "Refined",
        abbrev: "REF",
        record: "1-1-0",
      },
    ],
  },
];

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