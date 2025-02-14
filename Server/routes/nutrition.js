
//routes/nutrition.js
const express = require('express');
const { logNutrition, getNutrition } = require('../controllers/nutritionController'); // Ensure this is defined
const router = express.Router();

// Route to log nutrition
router.post('/', logNutrition); // This handles POST requests to /api/nutrition

// Route to get nutrition for a user
router.get('/:userId', getNutrition); // This handles GET requests to /api/nutrition/:userId

module.exports = router;