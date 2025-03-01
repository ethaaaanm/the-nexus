import React from "react";
import Banner from "../res/images/about_banner.svg"
import NexusShield from "../res/images/ic_nexus_shield.svg"
import AboutDropdown from "./AboutDropdown";
import ContactForm from "./ContactForm";

import "./about.css"

const About = () => {
    return(
        <div className="about-page">
            <div className="about-banner-wrap">
                <img src={Banner} alt="Family Banner" className="about-banner"/>
                <h1 className="about-banner-title">CREATING A CHRIST-CENTERED<br/> COMMUNITY THROUGH SPORTS.</h1>
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
                    <AboutDropdown sport = {'Ultimate Frisbee'} />
                    <AboutDropdown sport = {'Softball'} />
                    <AboutDropdown sport = {'Volleyball'} />
                    <AboutDropdown sport = {'Basketball'} />
                    <div className="about-divider"></div>
                    <h4 className="about-format-verse">So in Christ we, though many, form one body, and each member belongs to all the others.<br/><br/><br/>Romans 12:5</h4>
                </div>

                <div className="about-team-connect">
                    <h2 className="about-connect-title">Connect with our team. </h2>
                    <h5 className="about-connect-inquiries">Questions? Comments? Concerns? Reach out to our team and we'd love to help you out!</h5>
                    <ContactForm/>
                </div>
            </div>
        </div>
    )
};

export default About;