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
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/', auth(['admin']), getAllUsers); // Only admin can get all users
router.get('/:userId', auth(['admin']), getUserById); // Only admin can get user by ID
router.put('/:userId', auth(['admin']), updateUser ); // Only admin can update user
router.delete('/:userId', auth(['admin']), deleteUser ); // Only admin can delete user

module.exports = router;