//components\UserNavbar\TrainerNav.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/TrainerNav.css"; 

export const TrainerNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="trainerNav">
      <div className="container">
        <h1 className="logo"><Link to="/">Track<span>Fit</span></Link></h1>

        {/* Hamburger Menu */}
        <div className={`hamburger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Navigation Links */}
        <ul className={`trainerNavList ${menuOpen ? "active" : ""}`}>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
          <li><Link to="/clients" onClick={() => setMenuOpen(false)}>Clients</Link></li>
          <li><Link to="/workouts" onClick={() => setMenuOpen(false)}>Workouts</Link></li>
          <li><Link to="/nutrition" onClick={() => setMenuOpen(false)}>Nutrition</Link></li>
          <li><Link to="/progress" onClick={() => setMenuOpen(false)}>Progress</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default TrainerNavbar;
