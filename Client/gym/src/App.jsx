// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminLogin from './components/AdminLogin';
import AdminRegister from './components/AdminRegister';
import TrainerLogin from './components/TrainerLogin';
import TrainerRegister from './components/TrainerRegister';
import UserLogin from './components/UserLogin';
import UserRegister from './components/UserRegister'; // Ensure this is imported
import AdminDashboard from './components/AdminDashboard'; // Assuming you have this component
import TrainerDashboard from './components/TrainerDashboard'; // Assuming you have this component
import UserDashboard from './components/UserDashboard'; // Assuming you have this component
import Home from './pages/Home'; // Assuming you have this component
import About from './pages/About'; // Assuming you have this component
import Contact from './pages/Contact'; // Assuming you have this component
import { AuthProvider } from './context/AuthContext'; // Assuming you have an AuthContext for managing authentication

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin/register" element={<AdminRegister />} />
                    <Route path="/trainer/login" element={<TrainerLogin />} />
                    <Route path="/trainer/register" element={<TrainerRegister />} />
                    <Route path="/user/login" element={<UserLogin />} />
                    <Route path="/user/register" element={<UserRegister />} /> {/* Ensure this route is defined */}
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/trainer/dashboard" element={<TrainerDashboard />} />
                    <Route path="/user/dashboard" element={<UserDashboard />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;