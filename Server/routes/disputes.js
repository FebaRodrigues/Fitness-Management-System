const express = require('express');
const { createDispute, getDisputes, updateDispute } = require('../controllers/disputeController'); // Adjust the path as necessary

const router = express.Router();

// Define the route to create a dispute
router.post('/', createDispute); // POST /api/disputes

// Define the route to get all disputes
router.get('/', getDisputes); // GET /api/disputes

// Define the route to update a dispute
router.put('/:id', updateDispute); // PUT /api/disputes/:id

module.exports = router; 