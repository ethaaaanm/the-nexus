import React from "react";
import { NavLink } from "react-router-dom";
import "./components.css";
import logo from "../res/images/logo_green.png"

const TopNavBar = () => {
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
                            to="/about"
                            className={({ isActive }) => isActive ? 'active' : ''}
                        >
                            ABOUT
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/stats" 
                            className={({ isActive }) => isActive ? 'active' : ''} 
                        >
                            STATS
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/admin" 
                            className={({ isActive }) => isActive ? 'active' : ''} 
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