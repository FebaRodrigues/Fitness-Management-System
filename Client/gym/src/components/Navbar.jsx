// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/user/login">User  Login</Link>
            <Link to="/user/register">User  Register</Link>
            <Link to="/trainer/login">Trainer Login</Link>
            <Link to="/trainer/register">Trainer Register</Link>
            <Link to="/admin/login">Admin Login</Link>
            <Link to="/admin/register">Admin Register</Link>
            <Link to="/admin/dashboard">Admin Dashboard</Link>
            <Link to="/trainer/dashboard">Trainer Dashboard</Link>
            <Link to="/user/dashboard">User  Dashboard</Link>
        </nav>
    );
};

export default Navbar;