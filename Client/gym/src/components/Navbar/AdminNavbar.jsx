// src/components/Navbar/AdminNavbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/AdminNav.css"; // Create this CSS file

const AdminNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/admin/login");
    setMenuOpen(false);
  };

  return (
    <nav className="admin-navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">Track<span>Fit</span> Admin</Link>
        </div>
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={menuOpen ? "open" : ""}></span>
          <span className={menuOpen ? "open" : ""}></span>
          <span className={menuOpen ? "open" : ""}></span>
        </div>
        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li><Link to="/admin/dashboard">Dashboard</Link></li>
          <li><Link to="/admin/membership">Membership</Link></li>
          <li><Link to="/admin/payments">Payments</Link></li>
          <li><Link to="/admin/announcements">Announcements</Link></li>
          <li>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AdminNavbar;