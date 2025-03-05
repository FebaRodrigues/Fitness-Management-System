// routes/admin.js
const express = require('express');
const { 
    manageUsers, 
    approveTrainer, 
    registerAdmin , 
    loginAdmin, 
    getAllTrainersForAdmin, 
    getTrainerByIdForAdmin,
    getUserActivity,
    createUserActivity,
    getAdminProfile,
    updateAdminProfile
} = require('../controllers/adminController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/register', registerAdmin );
router.post('/login', loginAdmin);
router.get('/users', auth(['admin']), manageUsers); // Only admin can manage users
router.post('/approve-trainer', auth(['admin']), approveTrainer);
router.get('/trainers', auth(['admin']), getAllTrainersForAdmin);
router.get('/trainers/:trainerId', auth(['admin']), getTrainerByIdForAdmin);
router.get('/user-activity/:id', auth(['admin']), getUserActivity);
router.post('/user-activity', auth(['admin']), createUserActivity);
router.get('/profile', auth(['admin']), getAdminProfile);
router.put('/profile', auth(['admin']), updateAdminProfile);

module.exports = router;