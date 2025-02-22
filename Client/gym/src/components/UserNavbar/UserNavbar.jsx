import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../styles/UserNavbar.css"; 

export const UserNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="container">
        {/* Logo */}
        <div className="logo">
          <Link to="/">
            Track<span>Fit</span>
          </Link>
        </div>

        {/* Hamburger Menu */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={menuOpen ? "open" : ""}></span>
          <span className={menuOpen ? "open" : ""}></span>
          <span className={menuOpen ? "open" : ""}></span>
        </div>

        {/* Navigation Links */}
        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li>
            <Link to="/" className={location.pathname === "/" ? "active" : ""}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={location.pathname === "/about" ? "active" : ""}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/classes"
              className={location.pathname === "/classes" ? "active" : ""}
            >
              Classes
            </Link>
          </li>
          <li>
            <Link
              to="/schedules"
              className={location.pathname === "/schedules" ? "active" : ""}
            >
              Schedules
            </Link>
          </li>
          <li>
            <Link to="/signup" className="signup-btn">
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default UserNavbar;
