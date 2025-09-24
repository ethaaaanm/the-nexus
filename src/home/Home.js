import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import DateDropdown from "./DateDropdown";
import ScheduleItem from "./ScheduleItem";
import NewsItem from "./NewsItem";
import LeagueItem from "./LeagueItem";
import CurrentTeams from "../components/currentTeams";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

import HomeBannerDesktop from "../res/images/home_banner_desktop.png";
import HomeBannerMobile from "../res/images/home_banner_mobile.svg"
import Wordmark from "../res/images/wordmark.svg"

import "./home.css";


const Home = () => {
  const [selectedMonth, setSelectedMonth] = useState("June");
  const [selectedYear, setSelectedYear] = useState(2025);
  const [news, setNews] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [topPlayers, setTopPlayers] = useState({
    Basketball: [],
    "Ultimate Frisbee": [],
    Softball: [],
    Volleyball: [],
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

        fetchedSchedule.sort((a, b) => {
          const parseDate = (dateString) => {
            const [datePart, timePart] = dateString.split(" | ");
            const [month, day] = datePart.split("/").map(Number);
            const year = a.year;
            return new Date(`${year}-${month}-${day} ${timePart}`);
          };

          return parseDate(a.date) - parseDate(b.date); // Sort by ascending date
        });

        setSchedule(fetchedSchedule);
        setLoading(false);

      } catch (error) {
        console.error("Error fetching schedule:", error);
      }
    };

    const processTopPlayers = (players, sport) => {
      return players
        .map(player => {
          let formattedStats = {};
          let totalScore = 0;

          Object.keys(player.stats).forEach(key => {
            const match = key.match(/\((.*?)\)/);
            const cleanKey = match ? match[1] : key;
            const statValue = parseFloat(player.stats[key]) || 0;

            formattedStats[cleanKey] = statValue;
            totalScore += statValue;
          });

          return {
            playerName: player.playerName,
            teamID: player.teamID,
            stats: formattedStats,
            totalScore,
          };
        })
        .sort((a, b) => b.totalScore - a.totalScore)
        .slice(0, 5);
    };

    const fetchTopPlayers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "players"));
        const allPlayers = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        let topPlayersPerSport = {
          Basketball: [],
          "Ultimate Frisbee": [],
          Softball: [],
          Volleyball: [],
        };

        ["Basketball", "Ultimate Frisbee", "Softball", "Volleyball"].forEach(sport => {
          const sportPlayers = allPlayers
            .map(player => {
              const stats = player.seasonAverages?.[selectedYear]?.[sport] || {};
              return { ...player, stats };
            })
            .filter(player => Object.keys(player.stats).length > 0);

          topPlayersPerSport[sport] = processTopPlayers(sportPlayers, sport);
        });

        setTopPlayers(topPlayersPerSport);
        console.log("Fetched top players:", topPlayersPerSport);

      } catch (error) {
        console.error("Error fetching top players:", error);
      }
    };

    fetchTopPlayers();
    fetchNews();
    fetchSchedule();
  }, [selectedYear]);

  const filteredSchedule =
    selectedMonth === `${selectedYear} Season`
      ? schedule
      : schedule.filter((item) => item.month.toLowerCase() === selectedMonth.toLowerCase());

  return (
    <div className="home-container">
      <div className="home-banner">
        <h5 className="home-banner-text">We strive to build a fun, welcoming, Christ-like community and create an excuse to hang out and play all summer long.</h5>
        <img className="home-banner-img desktop" src={HomeBannerDesktop} alt="Home Banner" />
        <img className="home-banner-img mobile" src={HomeBannerMobile} alt="Home Banner Mobile" />
        <div className="home-banner-mobile">
            <h5 className="home-banner-mobile-text">Welcome to</h5>
            <div className="home-banner-nexus-logo">
                <img src={Wordmark} alt="The Nexus Footer" />
            </div>
        </div>
        <div class="home-banner-button-row">
          <a href="https://forms.gle/z83x9zu8HueUa4Bs6" target="_blank" rel="noopener noreferrer" className="home-banner-button-link">
            <button className="home-register">REGISTER TODAY</button>
          </a>
          <Link to="/about" className="home-banner-button-link">
            <button className="home-learn-more"><p>LEARN MORE</p></button>
          </Link>
        </div>
      </div>
      <div className="home">
        <div className="home-inner">
          {/* Top Left: News Section */}
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

          {/* Top Right: Schedule Dropdown */}
          <div className="schedule-dropdown">
            <h3>Schedule</h3>
            <DateDropdown
              months={["June", "July", "August", `${selectedYear} Season`]}
              defaultMonth="June"
              onMonthChange={setSelectedMonth}
            />
          </div>

          {/* Bottom Right: Schedule Section */}
          <div className="schedule-section">
            {filteredSchedule.length > 0 ? (
              filteredSchedule.map((item) => (
                <ScheduleItem
                  key={item.id || item.sport + item.date}
                  sport={item.sport}
                  date={item.date}
                  teams={[item.team1, item.team2]}
                  video={item.video}
                />
              ))
            ) : (
              <p>No games scheduled for this month.</p>
            )}
          </div>

          {/* Bottom Right: League Leaders Section */}
          <div className="league-section">
            <div className="league-header">
              <h3>League Leaders:</h3>
              <Link to="/stats" className="view-all-link">
                <button className="view-all"> View All </button>
              </Link>
            </div>
            <div className="current-record">
              <CurrentTeams />
            </div>
            <div className="leaderboard">
              <LeagueItem sport="Ultimate Frisbee" topPlayers={topPlayers["Ultimate Frisbee"]} />
              <LeagueItem sport="Basketball" topPlayers={topPlayers["Basketball"]} />
              <LeagueItem sport="Softball" topPlayers={topPlayers["Softball"]} />
              <LeagueItem sport="Volleyball" topPlayers={topPlayers["Volleyball"]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;