import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TrainerLogin = () => {
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
            navigate('/trainer-dashboard'); // Redirect to trainer dashboard
        } catch (error) {
            console.error('Login error:', error.response.data);
        }
    };

    return (
        <div className="auth-container">
            <h2>Login as Trainer</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </Form.Group>

                <Button variant="primary" type="submit">Login</Button>
            </Form>
        </div>
    );
};

export default TrainerLogin;