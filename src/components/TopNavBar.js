import { React, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "./components.css";
import logo from "../res/images/logo_green.svg"

const TopNavBar = () => {
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
    const adminPassword = "1Corinthians12:12";  // ADMIN: NAV PASSWORD
    const navigate = useNavigate();
    const location = useLocation();

    const handleAdminClick = (event) => {
        if (!isAdminLoggedIn) {
            event.preventDefault(); 
            const enteredPassword = window.prompt("Enter Admin Password:");

            if (enteredPassword === adminPassword) {
                setIsAdminLoggedIn(true);
                navigate("/admin"); 
            } else {
                alert("Incorrect password. Nice Try Pal.");
            }
        }
    };

    return (
        <header className="topnavbar">
            <div className="logo">
                <NavLink to="/">
                    <img src={logo} alt="Nexus Logo" />
                </NavLink>
            </div>
            <div className="navbar-right">
                <ul className="navbar-links">
                    <li>
                        <NavLink 
                            to="/" 
                            className={({ isActive }) => isActive ? 'active' : ''} 
                        >
                            HOME
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/stats" 
                            className={location.pathname.startsWith("/stats") || location.pathname === "/input-stats" ? 'active' : ''} 
                        >
                            STATS
                        </NavLink>
                    </li>
                     <li>
                        <NavLink
                            to="/about"
                            className={({ isActive }) => isActive ? 'active' : ''}
                        >
                            ABOUT
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/admin" 
                            className={({ isActive }) => isActive ? 'active' : ''} 
                            onClick={handleAdminClick}
                        >
                            ADMIN
                        </NavLink>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default TopNavBar;