//controllers/reportController.js

const User = require('../models/User');
const Payment = require('../models/Payment');
const Workout = require('../models/Workout');

// Generate user activity report
exports.generateUserReport = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);
        const payments = await Payment.find({ userId });
        const workouts = await Workout.find({ userId });

        const report = {
            user,
            payments,
            workouts,
        };

        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};