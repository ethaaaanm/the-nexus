import {React, useEffect} from "react";
import DesktopBanner from "../res/images/about_banner_desktop.png"
import MobileBanner from "../res/images/about_banner_mobile.png"
import NexusShield from "../res/images/ic_nexus_shield.svg"
import AboutDropdown from "./AboutDropdown";
import ContactForm from "./ContactForm";
import { FaYoutube } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { IoMail } from "react-icons/io5";


import "./about.css"

const About = () => {
        useEffect(() => {
            window.scrollTo(0, 0); 
          }, []); 

    return(
        <div className="about-page">
            <div className="about-banner-wrap">
                <img src={DesktopBanner} alt="Family Banner" className="about-banner"/>
                <img src={MobileBanner} alt="Family Banner" className="about-banner_mobile"/>
                <h1 className="about-banner-title">CREATING A CHRIST-CENTERED<br/> COMMUNITY THROUGH SPORT.</h1>
                <h5 className="about-banner-subtitle">“Nexus” refers to a central point or link that connects different elements or groups. 
                    It's often used to describe a hub or focal point where ideas, people, or things come together. 
                    In the context of the league name, "Nexus" symbolizes a place where players unite and intersect, 
                    emphasizing the connection and unity within the league. </h5>
            </div>

            <div className="about-wrapper">
                <div className="about-league-format">
                    <h4 className="about-format-breakdown">Format Breakdown</h4>
                    <h2 className="about-format-title">FOUR SPORTS. TWO TEAMS. ONE CHAMPION.</h2>
                    <img src={NexusShield} alt="The Nexus Shield" className="about-nexus-shield"/>
                    <div className="about-dropdown-wrapper">
                        <AboutDropdown sport = {'Softball'} />
                        <AboutDropdown sport = {'Basketball'} />
                        <AboutDropdown sport = {'Ultimate Frisbee'} />
                        <AboutDropdown sport = {'Volleyball'} />
                        <div className="about-divider"></div>
                    </div>
                    <h4 className="about-format-verse">So in Christ we, though many, form one body, and each member belongs to all the others.<br/><br/><br/>Romans 12:5</h4>
                </div>

                <div className="about-team-connect">
                    <ContactForm/>
                </div>

                <div className="about-socials-row">
                     <a href="mailto:contact.thenexusleague@gmail.com" className="about-social-button">
                        <IoMail className="about-mail-logo"/>
                        <h5 className="about-button-text">contact.thenexusleague@gmail.com</h5>
                    </a>
                    <a 
                    href="https://www.instagram.com/thenexusleague/"   
                    target="_blank"
                    rel="noopener noreferrer"
                    className="about-social-button"
                    >
                        <AiFillInstagram className="about-ig-logo" />
                        <h5 className="about-button-text">@thenexusleague</h5>
                    </a>
                    <a href="https://www.youtube.com/@TheNexus-League" target="_blank" rel="noopener noreferrer" className="about-social-button">
                            <FaYoutube className="about-yt-logo"/>  
                        <h5 className="about-button-text">@TheNexus-League</h5>
                    </a>
                </div>
            </div>
        </div>
    )
};

export default About;