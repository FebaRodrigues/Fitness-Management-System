import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Classes from './components/Classes';
import Schedule from './components/Schedule';
import Contact from './components/Contact';
import AdminDashboard from './components/AdminDashboard';
import TrainerDashboard from './components/TrainerDashboard';
import UserDashboard from './components/UserDashboard';
import Register from './components/Register';
import Login from './components/Login';
import TrainerRegister from './components/TrainerRegister';
import TrainerLogin from './components/TrainerLogin';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    return (
        <Router>
            <NavigationBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/classes" element={<Classes />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/trainer-dashboard" element={<TrainerDashboard />} />
                <Route path="/user-dashboard" element={<UserDashboard />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/trainer-register" element={<TrainerRegister />} />
                <Route path="/trainer-login" element={<TrainerLogin />} />
            </Routes>
        </Router>
    );
};

export default App;