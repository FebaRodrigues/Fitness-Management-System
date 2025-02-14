//routes/reports.js


const express = require('express');
const { generateUserReport } = require('../controllers/reportController');
const router = express.Router();

router.get('/user/:userId', generateUserReport); // Generate report for a user

module.exports = router;