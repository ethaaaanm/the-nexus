import React from "react";
import Banner from "../res/images/about_banner.svg"

const About = () => {
    return(
        <div className="about-page">
            <img src={Banner} alt="Family Banner" className="banner"/>
            <div className="mission-section">
                <h3>OUR MISSION</h3>
                <h5>“Nexus” refers to a central point or link that connects different elements or groups. 
                    It's often used to describe a hub or focal point where ideas, people, or things come together. 
                    In the context of the league name, "Nexus" symbolizes a place where players unite and intersect, emphasizing the connection and unity within the league. 
                    WE STRIVE to build a fun, welcoming, CHRIST-LIKE community and create an excuse 
                to hang out, play, and connect all summer long.</h5>
                <h4>so in Christ we, though many, form one body, and each member belongs to all the others.<br/>ROMANS 12:5 </h4>
            </div>

            <div className="format-section">
                <h3>FORMAT BREAKDOWN</h3>
                <h5>Four Sports. Two Teams. One Champion. 
                    Welcome to The Nexus! Get ready for an exciting summer filled with action as we rotate through four thrilling sports: Softball, Ultimate Frisbee, Volleyball, and Basketball. 
                    This is a Christian league, meaning we emphasize good sportsmanship and encourage everyone to speak in a friendly manner to one another. 
                    The league is a beginner friendly league, but every player is strongly encouraged to participate in all sports. </h5>
            </div>

            <div className="team-section">
                <h3>OUR TEAM</h3>
                
            </div>
        </div>
    )
};

export default About;