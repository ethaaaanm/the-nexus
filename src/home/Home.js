import React, { useState } from "react";
import Wordmark from "../res/images/wordmark_green.svg";
import "./home.css"; 
import Dropdown from "./dropdown"; // Import the custom dropdown component

// Data for the news section
const newsData = [
  {
    title: "Next Game Location",
    content: "Our next game will be hosted at People's Christian Academy, Renfrew Dr, Markham.",
    date: "6/4/2025",
  },
  {
    title: "Game Recording",
    content: "Watch the recording on our YouTube channel: @TheNexusLeague",
  },
  {
    title: "Congrats to Team Genesis!",
    content: "For winning the first-ever game of The Nexus!",
  },
];

// Full schedule data
const fullScheduleData = [
  {
    sport: "Ultimate Frisbee",
    date: "6/4/2025 | 7:00PM",
    teams: ["Genesis 1-0-0", "Refined 0-1-0"],
    month: "June",
  },
  {
    sport: "Softball",
    date: "6/11/2025 | 7:00PM",
    teams: ["Genesis 0-0-0", "Refined 0-0-0"],
    month: "June",
  },
  {
    sport: "Basketball",
    date: "7/1/2025 | 7:00PM",
    teams: ["Genesis 0-0-1", "Refined 1-0-0"],
    month: "July",
  },
];

const Home = () => {
  const [selectedMonth, setSelectedMonth] = useState("June"); // State to track selected month

  // Filter schedule data based on selected month
  const filteredSchedule = fullScheduleData.filter(
    (item) => item.month === selectedMonth
  );

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
            <p>{item.content}</p>
          </div>
        ))}
      </div>

      {/* Bottom Right: Schedule Section */}
      <div className="schedule-section">
        <h2>Schedule</h2>
        {filteredSchedule.map((item, index) => (
          <div className="schedule-item" key={index}>
            <div>
              <h3>{item.sport}</h3>
              <p>{item.date}</p>
              <p>{item.teams.join(" vs ")}</p>
            </div>
            <button className="play-button">▶</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;