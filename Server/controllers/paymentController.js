//controllers/paymentController.js
const Payment = require('../models/Payment');
const { v4: uuidv4 } = require('uuid');

// Process payment
exports.processPayment = async (req, res) => {
    const { userId, amount } = req.body;

    // Generate a unique transaction ID
    const transactionId = uuidv4(); // Generate a unique ID

    const payment = new Payment({
        userId,
        amount,
        transactionId // Include the unique transaction ID
    });

    try {
        await payment.save();
        res.status(201).json({ message: 'Payment processed successfully', transactionId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get payments for a user
exports.getPayments = async (req, res) => {
    const { userId } = req.params;
    try {
        const payments = await Payment.find({ userId });
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update payment status
exports.updatePayment = async (req, res) => {
    const { transactionId } = req.params; // Get transactionId from URL
    const { status } = req.body; // Get new status from request body

    try {
        const updatedPayment = await Payment.findOneAndUpdate(
            { transactionId },
            { status },
            { new: true } // Return the updated document
        );

        if (!updatedPayment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        res.status(200).json({ message: 'Payment updated successfully', updatedPayment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getTrainerEarnings = async (req, res) => {
    const { trainerId } = req.params; // Get trainerId from request parameters
    try {
        const payments = await Payment.find({ trainerId }); // Assuming Payment model has a trainerId field
        const totalEarnings = payments.reduce((total, payment) => total + payment.amount, 0); // Calculate total earnings
        res.status(200).json({ totalEarnings });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};