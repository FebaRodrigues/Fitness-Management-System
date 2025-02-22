// src/components/TrainerRegister.jsx
import React, { useState } from 'react';
import { registerTrainer } from '../api'; // Import the registerTrainer function

const TrainerRegister = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [specialties, setSpecialties] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await registerTrainer(name, email, password, specialties.split(','));
            alert('Trainer registration successful! You can now log in.');
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password } onChange={(e) => setPassword(e.target.value)} required />
            <input type="text" placeholder="Specialties (comma separated)" value={specialties} onChange={(e) => setSpecialties(e.target.value)} required />
            <button type="submit">Register as Trainer</button>
        </form>
    );
};

export default TrainerRegister;