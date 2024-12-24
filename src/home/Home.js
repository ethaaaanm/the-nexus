import React from "react";
import Wordmark from "../res/images/wordmark_green.svg"
import Dropdown from "../res/images/dropdown.svg"
import "./home.css";

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

const scheduleData = [
  {
    sport: "Ultimate Frisbee",
    date: "6/4/2025 | 7:00PM",
    teams: ["Genesis 1-0-0", "Refined 0-1-0"],
  },
  {
    sport: "Softball",
    date: "6/11/2025 | 7:00PM",
    teams: ["Genesis 0-0-0", "Refined 0-0-0"],
  },
];

const Home = () => {
  return (
    <div className="home">
      {/* Top Left: Title Logo */}
      <div className="title-logo">
        <img src={Wordmark} alt="The Nexus Title" />
      </div>

      {/* Top Right: Schedule Dropdown */}
      <div className="schedule-dropdown">
        <h3>Schedule</h3>
        <div className="button">
            <select id="month">
              <option value="june">JUNE</option>
              <option value="july">JULY</option>
              <option value="august">AUGUST</option>
            </select>
            <img src={Dropdown} alt="Dropdown Menu"/>
        </div>
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
        {scheduleData.map((item, index) => (
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