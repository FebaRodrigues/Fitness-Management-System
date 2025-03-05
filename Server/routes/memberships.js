// routes/memberships.js
const express = require('express');
const { 
  createMembership, 
  getUserMemberships, 
  updateMembershipStatus,
  getAllMemberships // New function
} = require('../controllers/membershipController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth(['user']), createMembership);
router.get('/user/:userId', auth(['user']), getUserMemberships);
router.put('/:membershipId', auth(['admin']), updateMembershipStatus);
router.get('/', auth(['admin']), getAllMemberships); // Add this for admins

module.exports = router;