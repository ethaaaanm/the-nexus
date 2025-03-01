import React, { useEffect, useRef, useState } from "react";
import { BiSolidDownArrow } from "react-icons/bi";
import UltimateIcon from "../res/images/ic_ultimate.svg";
import SoftballIcon from "../res/images/ic_softball.svg";
import BasketballIcon from "../res/images/ic_basketball.svg";
import VolleyballIcon from "../res/images/ic_volleyball.svg";

import "./about.css";

const sportIcons = {
    "Ultimate Frisbee": UltimateIcon,
    Softball: SoftballIcon,
    Basketball: BasketballIcon,
    Volleyball: VolleyballIcon,
  };

  const sportsDescription = {
    "Ultimate Frisbee": "Standard field length, we will play with the half-field line where you cannot score unless you are past halfway. We will be playing 7 on 7 with a girl-match rule, making 14/28 people on the field. Subs can only come in after a point is scored.",
    Softball: "Standard CCSA Rulings. Whoever the first base coach is will work as the ump for that inning, it is recommended that this would be someone with previous experience as an ump or someone that knows the proper rulings. We will be playing with a girl-match rule, 5 outfields, 5 infields, 3-pitch style.",
    Basketball: "Teams split into two lines. We will aim to play 5 games of 5 on 5 with 2 substitutions (7 total from each team). Games up to 15, 2'1 & 1's. No refs, so everything is self-called.",
    Volleyball: "Standard OVA rulings. Teams will split into two lines. We will aim to play sets of 7, with each round up to 15. 6 on 6 with substitutions. 14U Rules w/ Freeball.",
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