import React, { useEffect, useRef, useState } from "react";
import { BiSolidDownArrow } from "react-icons/bi";
import UltimateIcon from "../res/images/ic_ultimate.svg";
import SoftballIcon from "../res/images/ic_softball.svg";
import BasketballIcon from "../res/images/ic_basketball.svg";
import VolleyballIcon from "../res/images/ic_volleyball.svg";

import "./about.css";

const sportIcons = {
    Softball: SoftballIcon,
    Basketball: BasketballIcon,
    "Ultimate Frisbee": UltimateIcon,
    Volleyball: VolleyballIcon,
  };

  const sportsDescription = {
    Softball: "Softball is a team sport that emphasizes hitting, fielding, and strategy on a smaller field than baseball. We will follow the Official Slo-Pitch Rules of Softball published by Softball Canada. The first base coach will act as the umpire for the inning; it is recommended this be someone with prior umpiring experience or strong knowledge of the rules. We will be playing with a girl-match rule, using 5 outfielders, 4 infielders, and a 3-pitch format.",
    Basketball: "Basketball is a fast-paced team sport focused on scoring by shooting into a hoop while emphasizing teamwork and quick transitions. Teams will split into two lines. We will aim to play five pickup-style games of 5-on-5. Games will be played to 15 points, using 2's and 1's scoring. There will be no referees, so all calls will be self-officiated.",
    "Ultimate Frisbee": "Ultimate Frisbee is a fast-paced, non-contact team sport that combines elements of soccer, football, and basketball, emphasizing sportsmanship and fair play. Games will be played on a standard-length field, with a half-field line rule in effect: players must cross the half-field line before being eligible to score. Matches will be 7-on-7, with a girl-match rule applied, resulting in 14 players on the field at a time. Substitutions may only occur after a point is scored.",
    Volleyball: "Volleyball is a dynamic team sport where players aim to score by sending the ball over the net, using a combination of passing, setting, and spiking. We will follow the official Volleyball Canada rules, with some modifications. Teams will split into two lines, with the goal of playing sets of 7 rounds, each up to 15 points. We will play 6-on-6 with substitutions allowed. 14U rules will be used, with the inclusion of a freeball.",
  }

const AboutDropdown = ({sport}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggle = () => setIsOpen(!isOpen);

  useEffect(() => {
      const handleOutsideClick = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
          setIsOpen(false);
        }
      };
  
      const handleScroll = () => {
        if (dropdownRef.current) {
          const rect = dropdownRef.current.getBoundingClientRect();
          if (rect.top < 0 || rect.bottom > window.innerHeight) {
            setIsOpen(false);
          }
        }
      };
  
      document.addEventListener("click", handleOutsideClick);
      window.addEventListener("scroll", handleScroll);
  
      return () => {
        document.removeEventListener("click", handleOutsideClick);
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

 return (
     <div ref={dropdownRef} className="about-dropdown-container">
       <button
         className={`about-dropdown-button ${isOpen ? "active" : ""}`}
         onClick={handleToggle}
       >
        <div className="about-dropdown-bar">
            <img src={sportIcons[sport]} alt={`${sport} icon`} className="about-sport-icon" />
            <h3 className="about-sport-title">{sport}</h3>
            
            <span className={`about-dropdown-arrow ${isOpen ? "open" : ""}`}>
            <BiSolidDownArrow className="about-downarrow-icon"/>
            </span>
        </div>
         {isOpen && (
            
            <h1 className="about-sports-description">{sportsDescription[sport]}</h1>
       )}
       </button>
     </div>
   );
 };
 

export default AboutDropdown;