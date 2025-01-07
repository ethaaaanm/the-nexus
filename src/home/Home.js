import React, { useState } from "react";
import Dropdown from "./Dropdown"; 
import ScheduleItem from "./ScheduleItem";
import { newsData, scheduleData } from "../data/data"; 

import Wordmark from "../res/images/wordmark_green.svg";
import "./home.css"; 


const Home = () => {
  const [selectedMonth, setSelectedMonth] = useState("JUNE"); // Track selected month
  const [selectedYear, setSelectedYear] = useState(2025);
  const yearSchedule = scheduleData[selectedYear] || [];

  const filteredSchedule =
    selectedMonth === `${selectedYear} SEASON`
      ? yearSchedule
      : yearSchedule.filter((item) => item.month === selectedMonth);

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
          months={["JUNE", "JULY", "AUGUST", `${selectedYear} SEASON`]} 
          defaultMonth="JUNE"
          onMonthChange={setSelectedMonth}
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