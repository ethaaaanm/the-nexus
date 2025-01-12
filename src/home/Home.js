import React, { useState } from "react";
import Dropdown from "./Dropdown";
import ScheduleItem from "./ScheduleItem";
import NewsItem from "./NewsItem";
import LeagueItem from "./LeagueItem";
import CurrentTeams from "../components/currentTeams";

import { newsDB, scheduleDB, teamDB } from "../data/homeData";
import { sportsStatsDB } from "../data/sportsData";
import Wordmark from "../res/images/wordmark_green.svg";

import "./home.css";


const Home = () => {
  const [selectedMonth, setSelectedMonth] = useState("JUNE"); // Track selected month
  const [selectedYear, setSelectedYear] = useState(2025);
  const yearSchedule = scheduleDB[selectedYear] || [];

  const filteredSchedule =
    selectedMonth === `${selectedYear} SEASON`
      ? yearSchedule
      : yearSchedule.filter((item) => item.month === selectedMonth);

  return (
    <div className="home-container">
      <div className="home">
        {/* Top Left: Title Logo */}
        <div className="title-logo">
          <img src={Wordmark} alt="The Nexus Title" />
        </div>

        {/* Top Right: Schedule Dropdown */}
        <div className="schedule-dropdown">
          <h3>Schedule</h3>
          <Dropdown
            months={["JUNE", "JULY", "AUGUST", `${selectedYear} SEASON`]}
            defaultMonth="JUNE"
            onMonthChange={setSelectedMonth}
          />
        </div>

        {/* Bottom Left: News Section */}
        <div className="news-section">
          <h2>News</h2>
          {newsDB.map((item, index) => (
            <NewsItem
              key={index}
              title={item.title}
              date={item.date}
              content={item.content}
              isLastItem={index === newsDB.length - 1}
            />
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
              video={item.video}
            />
          ))}
        </div>

        {/* Bottom Right: League Leaders Section */}
        <div className="league-section">
          <div className="league-header">
            <h3>League Leaders</h3>
            <button className="view-all"> View All </button>
          </div>
          <div className="current-record">
            <CurrentTeams/>
          </div>
          <div className="leaderboard">
            <LeagueItem sport="Ultimate Frisbee" sportsStatsDB={sportsStatsDB} />
            <LeagueItem sport="Basketball" sportsStatsDB={sportsStatsDB} />
            <LeagueItem sport="Softball" sportsStatsDB={sportsStatsDB} />
            <LeagueItem sport="Volleyball" sportsStatsDB={sportsStatsDB} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;