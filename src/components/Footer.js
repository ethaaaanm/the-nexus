import React from "react";
import Instagram from "../res/images/ic_instagram.svg"
import Mail from "../res/images/ic_mail.svg"
import Workmark from "../res/images/wordmark.svg"
import './components.css'

const Footer = () => {
    return (
        <header className="footer">
            <div className="footer-title">
                <img src={Workmark} alt="The Nexus Footer" />
            </div>
            <h5 className="lil-msg-mobile">
                Building a Christ-centered community through sport.
            </h5>
            <div className="footer-right">
                <div className="logo-line">
                    <a
                        href="https://www.instagram.com/thenexusleague/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <input className="ig-logo" type="image" src={Instagram} alt="Instagram Logo" />
                    </a>
                    <a href="mailto:contact.thenexusleague@gmail.com">
                        <input className="mail-logo" type="image" src={Mail} alt="Mail Logo" />
                    </a>
                </div>
                <h5 className="lil-msg">
                    Building a Christ-centered community through sport.
                    <br /> © 2025 The Nexus League
                </h5>
            </div>
            <div className="copyright-section">
                <div className="divider" />
                <h5 className="copyright-msg">© 2025 The Nexus League</h5>
            </div>
        </header>
    );
};

export default Footer;