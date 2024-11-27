import React from "react";
import { NavLink } from "react-router-dom";
import "./components.css";

const TopNavBar = () => {
    return (
        <header className="topnavbar">
            <div className="logo">
                <NavLink to="/">
                    <img src="logo.svg" alt="Nexus Logo" />
                </NavLink>
            </div>
            <div className="navbar-right">
                <ul className="navbar-links">
                    <li>
                        <NavLink 
                            to="/" 
                            className={({ isActive }) => isActive ? 'active' : ''} 
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/stats" 
                            className={({ isActive }) => isActive ? 'active' : ''} 
                        >
                            Stats
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/admin" 
                            className={({ isActive }) => isActive ? 'active' : ''} 
                        >
                            Admin
                        </NavLink>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default TopNavBar;