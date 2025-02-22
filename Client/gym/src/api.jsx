// src/api.jsx
import axios from 'axios';

// Set the base URL for your API
const API_URL = 'http://localhost:5050/api';

// Create an instance of axios
const api = axios.create({
    baseURL: API_URL,
});

// Admin API calls
export const registerAdmin = async (name, email, password) => {
    return await api.post('/admin/register', { name, email, password });
};

export const loginAdmin = async (email, password) => {
    return await api.post('/admin/login', { email, password });
};

// Trainer API calls
export const registerTrainer = async (name, email, password, specialties) => {
    return await api.post('/trainers/register', { name, email, password, specialties });
};

export const loginTrainer = async (email, password) => {
    return await api.post('/trainers/login', { email, password });
};

// User API calls
export const registerUser  = async (formData) => {
    return await api.post('/users/register', formData, {
        headers: {
            'Content-Type': 'multipart/form-data', // Set the content type for file uploads
        },
    });
};

export const loginUser  = async (email, password) => {
    return await api.post('/users/login', { email, password });
};