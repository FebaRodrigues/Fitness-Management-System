// routes/users.js
const express = require('express');
const {
    register,
    login,
    getAllUsers,
    getUserById,
    updateUser ,
    deleteUser 
} = require('../controllers/userController');
const auth = require('../middleware/auth'); // Import auth middleware if needed
const router = express.Router();

// User registration
router.post('/register', register);

// User login
router.post('/login', login);

// Protect user routes
router.get('/', auth, getAllUsers); // Only admin can get all users
router.get('/:userId', auth, getUserById); // Get user by ID
router.put('/:userId', auth, updateUser ); // Update user
router.delete('/:userId', auth, deleteUser ); // Delete user

module.exports = router;