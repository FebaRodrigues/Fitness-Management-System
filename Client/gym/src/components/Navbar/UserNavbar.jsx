
// src/components/UserNavbar/UserNavbar.jsx
import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "../../styles/UserNavbar.css";

export const UserNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
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
          <li>
            <Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link>
          </li>
          <li>
            <Link to="/about" className={location.pathname === "/about" ? "active" : ""}>About</Link>
          </li>
          <li>
            <Link to="/user/dashboard" className={location.pathname === "/user/dashboard" ? "active" : ""}>Dashboard</Link>
          </li>
         
          {/* <li>
            <Link to="/user/goals" className={location.pathname === "/user/goals" ? "active" : ""}>Goals</Link>
          </li> */}

          <li>
            <Link to="/user/workout-log" className={location.pathname === "/user/workout-log" ? "active" : ""}>Workout Log</Link>
          </li>
          <li>
            <Link to="/user/appointments" className={location.pathname === "/user/appointments" ? "active" : ""}>Appointments</Link>
          </li>
         
          <li>
            <Link to="/user/membership" className={location.pathname === "/user/membership" ? "active" : ""}>Membership</Link>
          </li>
          <li>
            <Link to="/user/payments" className={location.pathname === "/user/payments" ? "active" : ""}>Payments</Link>
          </li>
          <li>
            <Link to="/user/Goals" className={location.pathname === "/user/UserGoalForm" ? "active" : ""}>Goals</Link>
          </li>
          <li>
            <Link to="/user/notifications" className={location.pathname === "/user/notifications" ? "active" : ""}>Notifications</Link>
          </li>
          {user ? (
            <li>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </li>
          ) : (
            <li>
              <Link to="/users/login" className="signup-btn">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default UserNavbar;