//src/components/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"; 

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="container">
                {/* Logo */}
                <div className="logo">
                    <Link to="/">Track<span>Fit</span></Link>
                </div>

                {/* Hamburger Menu */}
                <div className={`hamburger ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(!isOpen)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                {/* Navigation Links */}
                <ul className={`nav-links ${isOpen ? "active" : ""}`}>
                    <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
                    <li><Link to="/about" onClick={() => setIsOpen(false)}>About</Link></li>
                    {/* <li><Link to="/trainers/login" onClick={() => setIsOpen(false)}>Trainer Login</Link></li> */}
                    <li><Link to="/trainers/register" onClick={() => setIsOpen(false)}>Trainer</Link></li>
                    {/* <li><Link to="/admin/login" onClick={() => setIsOpen(false)}>Admin Login</Link></li>
                    <li><Link to="/admin/register" onClick={() => setIsOpen(false)}>Admin Register</Link></li> */}
                    {/* <li><Link to="/admin/dashboard" onClick={() => setIsOpen(false)}>Admin Dashboard</Link></li>
                    <li><Link to="/trainer/dashboard" onClick={() => setIsOpen(false)}>Trainer Dashboard</Link></li>
                    <li><Link to="/user/dashboard" onClick={() => setIsOpen(false)}>User Dashboard</Link></li> */}
                    {/* <li><Link to="/users/register" onClick={() => setIsOpen(false)}>sign In</Link></li> */}
                    <li><Link to="/users/login" onClick={() => setIsOpen(false)}>Sign Up</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
