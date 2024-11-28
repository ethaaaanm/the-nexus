import React, { } from "react";
import Trailer from "./Trailer";
import photo1 from "../res/images/DSC_1405.jpg"
import photo2 from "../res/images/DSC_1176.jpg"
import photo3 from "../res/images/DSC_1542.jpg"
import Carousel from 'react-bootstrap/Carousel';
import CarouselItem from 'react-bootstrap/CarouselItem'
import CarouselCaption from 'react-bootstrap/CarouselCaption'

import './home.css';
import time from "../res/images/time.png"


const Home = () => {
  return (
    <div id="home">
      <h1 id="greeting">Welcome to The Nexus League!</h1>
      <div id="clip">
        <Trailer />
      </div>

      <h2 id="feature">Features</h2>

      <div id="feature-carousel">
        <Carousel>
          <CarouselItem>
            <img src={photo1} alt="First slide" />
            <CarouselCaption>
              <h3>Jhon Tracey</h3>
              <p>The Nexus</p>
            </CarouselCaption>
          </CarouselItem>
          <CarouselItem>
            <img src={photo2} alt="Second slide" />
            <CarouselCaption>
              <h3>Crodey</h3>
              <p>Big Hitta</p>
            </CarouselCaption>
          </CarouselItem>
          <CarouselItem>
            <img src={photo3} alt="Third slide" />
            <CarouselCaption>
              <h3>Jamesie</h3>
              <p>Elegant Bird</p>
            </CarouselCaption>
          </CarouselItem>
        </Carousel>
      </div>

      <h3 id="home-title">Schedule or Upcoming Events</h3>

      <div class="event-container">
        <h3 class="year">2025</h3>

        <div class="event">
          <div class="event-left">
            <div class="event-date">
              <div class="date">4</div>
              <div class="month">June</div>
            </div>
          </div>

          <div class="event-right">
            <h3 class="event-title">Ultimate Frisbee</h3>

            <div class="event-description">
              Week 1: Welcome to the Nexus League!
              <br/>
              Kick Off Event
            </div>

            <div class="event-timing">
              <img src={time} alt="" /> 7:00 pm
            </div>
          </div>
        </div>

        <div class="event">
          <div class="event-left">
            <div class="event-date">
              <div class="date">11</div>
              <div class="month">June</div>
            </div>
          </div>

          <div class="event-right">
            <h3 class="event-title">Softball</h3>

            <div class="event-description">
              Week 2: First Softball Game<br/>Rock vs United
            </div>

            <div class="event-timing">
              <img src={time} alt="" /> 7:00 pm
            </div>
          </div>
        </div>

        <div class="event">
          <div class="event-left">
            <div class="event-date">
              <div class="date">18</div>
              <div class="month">June</div>
            </div>
          </div>

          <div class="event-right">
            <h3 class="event-title">Basketball</h3>

            <div class="event-description">
              Week 3: Big Balls Sesh
              <br/>
              Bring the BOOM
            </div>

            <div class="event-timing">
              <img src={time} alt="" /> 7:00 pm
            </div>
          </div>
        </div>


        <div class="event">
          <div class="event-left">
            <div class="event-date">
              <div class="date">25</div>
              <div class="month">June</div>
            </div>
          </div>

          <div class="event-right">
            <h3 class="event-title">Volleyball</h3>

            <div class="event-description">
              Week 4: Yungins Time to Shine
              <br/>
              Thunda Thunda!!
            </div>

            <div class="event-timing">
              <img src={time} alt="" /> 7:00 pm
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;