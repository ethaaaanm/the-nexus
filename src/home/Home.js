import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import './home.css';

import SportSelection from "../components/SportsSelection";
import SoftballStats from "../components/SoftballStats";
import BasketballStats from "../components/BasketballStats";
import VolleyballStats from "../components/VolleyballStats";
import UltimateStats from "../components/UltimateStats";

import Trailer from "./Trailer";
import photo1 from "../res/images/DSC_1405.jpg"
import photo2 from "../res/images/DSC_1176.jpg"
import photo3 from "../res/images/DSC_1542.jpg"
import Carousel from 'react-bootstrap/Carousel';
import CarouselItem from 'react-bootstrap/CarouselItem'
import CarouselCaption from 'react-bootstrap/CarouselCaption'

const Home = () => {
  const [selectedSport, setSelectedSport] = useState("Basketball");
  const [playerStats, setPlayerStats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const playersRef = collection(db, "players");
      const playerSnapshot = await getDocs(playersRef);

      const stats = playerSnapshot.docs.map((doc) => {
        const data = doc.data();
        const playerStats = {
          playerName: data.playerName || "-",
          teamId: data.team_id || "-",
          ...data.stats[selectedSport.toLowerCase()],
        };

        if (selectedSport === "Softball") {
          playerStats.battingAverage = data.stats.softball
            ? ((playerStats.hits / playerStats.atBats) * 100 || 0).toFixed(2)
            : "-";
        }

        if (selectedSport === "Volleyball") {
          playerStats.winPercentage = data.stats.volleyball
            ? ((playerStats.wins / playerStats.gamesPlayed) * 100 || 0).toFixed(2)
            : "-";
        }

        for (let key in playerStats) {
          if (playerStats[key] === null || playerStats[key] === undefined) {
            playerStats[key] = "-";
          }
        }

        return playerStats;
      });

      setPlayerStats(stats);
    };

    fetchData();
  }, [selectedSport]);

  return (
    <div id="home">
      <h1 id="greeting">Welcome to The Nexus League!</h1>
      <div id="clip">     
        <Trailer/>
      </div>

      <h2 id="feature">Features</h2>

      <div id="feature-carousel">
        <Carousel>
          <CarouselItem>
            <img src={photo1} alt="First slide" />
            <CarouselCaption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </CarouselCaption>
          </CarouselItem>
          <CarouselItem>
            <img src={photo2} alt="Second slide" />
            <CarouselCaption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </CarouselCaption>
          </CarouselItem>
          <CarouselItem>
            <img src={photo3} alt="Third slide" />
            <CarouselCaption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </CarouselCaption>
          </CarouselItem>
        </Carousel>
      </div>

      <h3 id="home-title">Schedule</h3>

      <div className="sport-selection">
        <SportSelection onSelectSport={setSelectedSport} />
      </div>
      <div style={{ marginTop: "20px" }}>
        {selectedSport === "Basketball" && <BasketballStats playerStats={playerStats} />}
        {selectedSport === "Softball" && <SoftballStats playerStats={playerStats} />}
        {selectedSport === "Volleyball" && <VolleyballStats playerStats={playerStats} />}
        {selectedSport === "Ultimate" && <UltimateStats playerStats={playerStats} />}
      </div>
    </div>
  );
};

export default Home;