// src/components/Admin/AdminRegister.jsx
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { registerAdmin } from '../../api';
import '../../styles/AdminStyle.css';

const AdminRegister = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await registerAdmin(name, email, password);
            alert('Admin registration successful! You can now log in.');
            navigate("/admin/login");
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <div className="admin-auth-container">
            <form className="admin-auth-form" onSubmit={handleRegister}>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit"> Admin Register</button>
            </form>
        </div>
    );
};

export default AdminRegister;
