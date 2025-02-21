import React, { useEffect, useState } from "react";
import DateDropdown from "./DateDropdown";
import ScheduleItem from "./ScheduleItem";
import NewsItem from "./NewsItem";
import LeagueItem from "./LeagueItem";
import CurrentTeams from "../components/currentTeams";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig"; 

import { scheduleDB } from "../data/homeData";
import { sportsStatsDB } from "../data/sportsData";
import Wordmark from "../res/images/wordmark_green.svg";

import "./home.css";


const Home = () => {
  const [selectedMonth, setSelectedMonth] = useState("JUNE"); 
  const [selectedYear, setSelectedYear] = useState(2025);
  const [news, setNews] = useState([]); 
  const [schedule, setSchedule] = useState([]);

  const filteredSchedule =
    selectedMonth === `${selectedYear} SEASON`
      ? schedule
      : schedule.filter((item) => item.month === selectedMonth);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const newsCollection = collection(db, "announcements");
        const newsSnapshot = await getDocs(newsCollection);
        const fetchedNews = newsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        fetchedNews.sort((a, b) => new Date(b.date) - new Date(a.date));


        const hardcodedNews = [
          {
            title: "Subscribe to our Youtube",
            content: "Watch all your highlights on @TheNexus-League",
          },
          {
            title: "",
            content: "You're all caught up on the news of The Nexus!",
          },
        ];

        setNews([...fetchedNews, ...hardcodedNews]);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    const fetchSchedule = async () => {
      try {
        const scheduleCollection = collection(db, "schedule");
        const scheduleSnapshot = await getDocs(scheduleCollection);
        const fetchedSchedule = scheduleSnapshot.docs.map((doc) => ({
          id: doc.id, ...doc.data(),
        }))
        setSchedule(fetchedSchedule);

      } catch (error) {
          console.error("Error fetching schedule:", error);
      }

    };

    fetchNews();
    fetchSchedule();
  }, []);
    
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
          <DateDropdown
            months={["June", "July", "August", `${selectedYear} SEASON`]}
            defaultMonth="JUNE"
            onMonthChange={setSelectedMonth}
          />
        </div>

        {/* Bottom Left: News Section */}
        <div className="news-section">
          <h2>News</h2>
          {news.map((item, index) => (
            <NewsItem
              key={index}
              title={item.title}
              date={item.date}
              content={item.content}
              isLastItem={index >= news.length - 2}
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
              teams={[item.team1, item.team2]}
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