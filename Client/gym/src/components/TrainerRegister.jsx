import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TrainerRegister = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [specialties, setSpecialties] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:5050/api/auth/register`, {
                name,
                email,
                password,
                specialties: specialties.split(',').map(s => s.trim()), // Convert specialties to an array
            });
            navigate('/trainer-login'); // Redirect to trainer login after successful registration
        } catch (error) {
            console.error('Registration error:', error.response.data);
        }
    };

    return (
        <div className="auth-container">
            <h2>Register as Trainer</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} required />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </Form.Group>

                <Form.Group controlId="formBasicSpecialties">
                    <Form.Label>Specialties</Form.Label>
                    <Form.Control type="text" placeholder="Enter specialties (comma separated)" value={specialties} onChange={(e) => setSpecialties(e.target.value)} required />
                </Form.Group>

                <Button variant="primary" type="submit">Register</Button>
            </Form>
        </div>
    );
};

export default TrainerRegister;