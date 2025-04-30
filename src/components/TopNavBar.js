import { React, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; 

import "./components.css";
import logo from "../res/images/logo_green.svg"

const TopNavBar = () => {
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

    const toggleMobileMenu = () => {
        setMobileMenuOpen(prev => !prev);
    };

    const closeMenu = () => setMobileMenuOpen(false);

    return (
        <header className="topnavbar">
            <div className="logo">
                <NavLink to="/" onClick={closeMenu}>
                    <img src={logo} alt="Nexus Logo" />
                </NavLink>
            </div>

            <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
                {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </div>
            <nav className={`navbar-right ${mobileMenuOpen ? "open" : ""}`}>
                <ul className="navbar-links">
                    <li><NavLink to="/" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>HOME</NavLink></li>
                    <li><NavLink to="/stats" onClick={closeMenu} className={location.pathname.startsWith("/stats") || location.pathname === "/input-stats" ? 'active' : ''}>STATS</NavLink></li>
                    <li><NavLink to="/about" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>ABOUT</NavLink></li>
                    <li><NavLink to="/admin" onClick={(e) => { handleAdminClick(e); closeMenu(); }} className={({ isActive }) => isActive ? 'active' : ''}>ADMIN</NavLink></li>
                </ul>
            </nav>
        </header>
    );
};

export default TopNavBar;