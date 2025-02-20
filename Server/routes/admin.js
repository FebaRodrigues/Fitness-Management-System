// routes/admin.js
const express = require('express');
const { 
    manageUsers, 
    approveTrainer, 
    registerUser , 
    loginAdmin, 
    getAllTrainersForAdmin, 
    getTrainerByIdForAdmin,
    getUserActivity,
    createUserActivity 
} = require('../controllers/adminController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/register', registerUser );
router.post('/login', loginAdmin);
router.get('/users', auth(['admin']), manageUsers); // Only admin can manage users
router.post('/approve-trainer', auth(['admin']), approveTrainer);
router.get('/trainers', auth(['admin']), getAllTrainersForAdmin);
router.get('/trainers/:trainerId', auth(['admin']), getTrainerByIdForAdmin);
router.get('/user-activity/:id', auth(['admin']), getUserActivity);
router.post('/user-activity', auth(['admin']), createUserActivity);

module.exports = router;