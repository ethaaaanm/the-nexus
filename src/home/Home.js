import React, { } from "react";
import Trailer from "./Trailer";
import photo1 from "../res/images/DSC_1405.jpg"
import photo2 from "../res/images/DSC_1176.jpg"
import photo3 from "../res/images/DSC_1542.jpg"
import Carousel from 'react-bootstrap/Carousel';
import CarouselItem from 'react-bootstrap/CarouselItem'
import CarouselCaption from 'react-bootstrap/CarouselCaption'

import './home.css';
import events from "../data/events";
import time from "../res/images/time.png";


const Home = () => {
  return (
    <div id="home">
      <h1 id="greeting">WELCOME TO <br/> THE NEXUS LEAGUE</h1>
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

      <div className="event-container">
        <h3 className="year">2025</h3>

        {events.map((event, index) => (
          <div className="event" key={index}>
            <div className="event-left">
              <div className="event-date">
                <div className="date">{event.date}</div>
                <div className="month">{event.month}</div>
              </div>
            </div>
            <div className="event-right">
              <h3 className="event-title">{event.title}</h3>
              <div
                className="event-description"
                dangerouslySetInnerHTML={{ __html: event.description }}
              ></div>
              <div className="event-timing">
                <img src={time} alt="Time icon" />
                {event.time}
              </div>
            </div>
            <div className="event-image">
              <img src={event.image} alt={`${event.title} img`} />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Home;