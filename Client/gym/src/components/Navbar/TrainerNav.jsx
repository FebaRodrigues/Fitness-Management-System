// components/Navbar/TrainerNav.jsx
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "../../styles/TrainerNav.css";

const TrainerNavbar = () => {
  const { trainer } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("trainer");
    localStorage.removeItem("role");
    navigate("/");
    setMenuOpen(false);
  };

  return (
    <nav className="trainer-navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">Track<span>Fit</span></Link>
        </div>
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={menuOpen ? "open" : ""}></span>
          <span className={menuOpen ? "open" : ""}></span>
          <span className={menuOpen ? "open" : ""}></span>
        </div>
        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li><Link to="/trainer/dashboard">Dashboard</Link></li>
          <li><Link to="/trainer/clients">Clients</Link></li>
          <li><Link to="/trainer/workout-plans">Workout Plans</Link></li>
          <li><Link to="/trainer/payments">Payments</Link></li>
          <li><Link to="/trainer/notifications">Notifications</Link></li>
          
          <li><Link to="/trainer/progress">Progress Tracking</Link></li>
          {trainer ? (
            <li><Link to={`/trainers/profile/${trainer._id}`}>View Profile</Link></li>
          ) : (
            <li><Link to="/trainers/login">Login to view profile</Link></li>
          )}
          <li>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default TrainerNavbar;