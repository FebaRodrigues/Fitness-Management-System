import React, { useState } from 'react';
import { loginAdmin } from '../api';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminStyle.css';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await loginAdmin(email, password);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('role', response.data.role);
            navigate('/admin/dashboard');
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="admin-auth-container">
            <form className="admin-auth-form" onSubmit={handleLogin}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit"> Admin Login</button>
            </form>
        </div>
    );
};

export default AdminLogin;
