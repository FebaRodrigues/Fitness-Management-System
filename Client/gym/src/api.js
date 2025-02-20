import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5050/api', // Adjust the base URL as needed
});

export const registerUser  = (data) => api.post('/auth/register', data);
export const loginUser  = (data) => api.post('/auth/login', data);

export default api;