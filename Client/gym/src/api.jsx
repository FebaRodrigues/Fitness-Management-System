// src/api.jsx
import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5050/api', // Adjust the base URL as needed
    withCredentials: true,
});

// Set up the interceptor to include the token in the headers
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// User API
export const loginUser = (email, password) => {
    return API.post('/users/login', { email, password });
};

export const registerUser = (data) => {
    return API.post('/users/register', data);
};

export const getUserById = () => {
    return API.get('/users/profile');
};

export const updateUser = (data) => {
    return API.put('/users/profile', data);
};

// Trainer API
export const loginTrainer = (email, password) => {
    return API.post('/trainers/login', { email, password });
};

export const registerTrainer = (data) => {
    return API.post('/trainers/register', data);
};

// Admin API
export const loginAdmin = (email, password) => {
    return API.post('/admin/login', { email, password });
};

export const registerAdmin = (name, email, password) => {
    return API.post('/admin/register', { name, email, password });
};

export const getAdminProfile = () => {
    return API.get('/admin/profile');
};
// src/api.jsx
export const updateAdminProfile = (data) => {
    return API.put('/admin/profile', data);
  };

// Goals API
export const getGoalsByUserId = (userId) => {
    return API.get(`/goals/${userId}`);
};

export const createGoal = (goalData) => {
    return API.post('/goals', goalData);
};

export const deleteGoal = (goalId) => {
    return API.delete(`/goals/${goalId}`);
};

// Workouts API
export const getWorkoutsByUserId = (userId) => {
    return API.get(`/workouts/user/${userId}`);
};

export const createWorkout = (workoutData) => {
    return API.post('/workouts', workoutData);
};

export const deleteWorkout = (workoutId) => {
    return API.delete(`/workouts/${workoutId}`);
};




  

export const updateTrainerProfile = async (trainerId, data) => {
    return await API.put(`/trainers/profile/${trainerId}`, data);
};

export const getTrainerProfileById = async (trainerId) => {
    return await API.get(`/trainers/profile/${trainerId}?t=${Date.now()}`, {
      headers: {
        "Cache-Control": "no-cache",
      },
    });
  };



export default API;