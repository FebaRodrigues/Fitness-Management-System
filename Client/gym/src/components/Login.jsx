import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; // Import the CSS file for styling

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5050/api/auth/login`, {
                email,
                password,
            });
            localStorage.setItem('token', response.data.token);
            
            // Check the role and navigate accordingly
            const role = response.data.role; // Assuming the role is returned in the response
            if (role === 'admin') {
                navigate('/admin-dashboard');
            } else if (role === 'trainer') {
                navigate('/trainer-dashboard');
            } else if (role === 'user') {
                navigate('/'); // Redirect to home page for users
            } else {
                console.error('Unknown role:', role);
            }
        } catch (error) {
            console.error('Login error:', error.response.data); // Log the error response
        }
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            <Form onSubmit={handleSubmit} className="auth-form">
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </Form.Group>

                <Button variant="primary" type="submit" className="auth-button">Login</Button>
            </Form>
            <p className="auth-footer">
                Don't have an account? <a href="/register">Register here</a>
            </p>
        </div>
    );
};

export default Login;