//controller/disputeController.js
const Dispute = require('../models/Dispute'); // Adjust the path as necessary

// Create a dispute
exports.createDispute = async (req, res) => {
    const { userId, trainerId, description } = req.body; // Extract data from the request body
    try {
        const newDispute = new Dispute({
            userId,
            trainerId,
            description,
            timestamp: new Date() // Set the current timestamp
        });
        await newDispute.save(); // Save the dispute to the database
        res.status(201).json({ message: 'Dispute created successfully', dispute: newDispute });
    } catch (error) {
        res.status(500).json({ error: error.message }); // Handle any errors
    }
};

// Get all disputes for an admin
exports.getDisputes = async (req, res) => {
    try {
        const disputes = await Dispute.find();
        res.status(200).json(disputes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a dispute
exports.updateDispute = async (req, res) => {
    const { id } = req.params; // Get the dispute ID from the request parameters
    const { status } = req.body; // Get the status from the request body
    try {
        const updatedDispute = await Dispute.findByIdAndUpdate(id, { status }, { new: true }); // Update the dispute
        if (!updatedDispute) {
            return res.status(404).json({ message: 'Dispute not found' }); // Handle case where dispute is not found
        }
        res.status(200).json(updatedDispute); // Return the updated dispute
    } catch (error) {
        res.status(500).json({ error: error.message }); // Handle any errors
    }
};