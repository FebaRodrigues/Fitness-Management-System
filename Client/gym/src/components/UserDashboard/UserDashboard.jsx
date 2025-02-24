// components/UserDashboard/UserDashboard.jsx
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import UserNavbar from '../UserNavbar/UserNavbar';
import './UserDashboard.css'; 
const UserDashboard = () => {
    return (
        <div className="user-dashboard">
            {/* <UserNavbar /> */}
            <div className="dashboard-content">
                
                <nav>
                    <ul>
                        <li><Link to="profile">Profile</Link></li>
                        <li><Link to="my-workouts">My Workouts</Link></li>
                        <li><Link to="workout-history">Workout History</Link></li>
                        <li><Link to="goals">Goals</Link></li>
                        <li><Link to="messages">Messages</Link></li>
                        <li><Link to="nutrition">Nutrition</Link></li>
                        <li><Link to="appointments">Appointments</Link></li>
                        <li><Link to="feedback">Feedback</Link></li>
                    </ul>
                </nav>
                <Outlet /> 
            </div>
        </div>
    );
};

export default UserDashboard;