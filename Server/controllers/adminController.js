// controllers/adminController.js
const User = require('../models/User');
const Admin = require('../models/Admin'); 
const Trainer = require('../models/Trainer'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserActivity = require('../models/UserActivity');

// Register a new admin
exports.registerAdmin  = async (req, res) => {
    const { name, password, email } = req.body; // Only include name, password, and email

    try {
        // Check if the email already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({ name, password: hashedPassword, email, role: 'admin' }); // Ensure role is set to 'admin'
        await newAdmin.save();

        res.status(201).json({ message: 'Admin registered successfully', adminId: newAdmin._id });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Login admin

exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body; // Use email for login

    try {
        const admin = await Admin.findOne({ email }); // Check Admin model by email
        if (!admin || !(await bcrypt.compare(password, admin.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, role: 'admin' }); // Ensure role is set to 'admin'
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Manage user accounts
exports.manageUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Approve new trainers
exports.approveTrainer = async (req, res) => {
    const { trainerId } = req.body;
    try {
        const trainer = await Trainer.findById(trainerId);
        if (!trainer) return res.status(404).json({ message: 'Trainer not found' });

        trainer.approved = true; // Assuming you have an approved field
        await trainer.save();
        res.status(200).json({ message: 'Trainer approved successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all trainers for admin
exports.getAllTrainersForAdmin = async (req, res) => {
    try {
        const trainers = await Trainer.find();
        res.status(200).json(trainers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a trainer by ID
exports.getTrainerByIdForAdmin = async (req, res) => {
    const { trainerId } = req.params;
    try {
        const trainer = await Trainer.findById(trainerId);
        if (!trainer) return res.status(404).json({ message: 'Trainer not found' });
        res.status(200).json(trainer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a trainer
exports.updateTrainer = async (req, res) => {
    const { trainerId } = req.params;
    const updates = req.body;
    try {
        const trainer = await Trainer.findByIdAndUpdate(trainerId, updates, { new: true });
        if (!trainer) return res.status(404).json({ message: 'Trainer not found' });
        res.status(200).json(trainer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a trainer
exports.deleteTrainer = async (req, res) => {
    const { trainerId } = req.params;
    try {
        const trainer = await Trainer.findByIdAndDelete(trainerId);
        if (!trainer) return res.status(404).json({ message: 'Trainer not found' });
        res.status(200).json({ message: 'Trainer deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get user activity by user ID
exports.getUserActivity = async (req, res) => {
    const { id } = req.params; // Extract user ID from the request parameters
    try {
        const activity = await UserActivity.find({ userId: id }); // Assuming UserActivity model has a userId field
        
        if (!activity || activity.length === 0) {
            return res.status(404).json({ message: 'No activity found for this user' });
        }

        res.status(200).json(activity); // Return the user activity
    } catch (error) {
        res.status(500).json({ error: error.message }); // Handle any errors
    }
};

exports.createUserActivity = async (req, res) => {
    const { userId, activityType, description } = req.body; // Extract data from the request body
    try {
        const newActivity = new UserActivity({
            userId,
            activityType,
            description,
            timestamp: new Date() // Set the current timestamp
        });
        await newActivity.save(); // Save the activity to the database
        res.status(201).json({ message: 'User  activity created successfully', activity: newActivity });
    } catch (error) {
        res.status(500).json({ error: error.message }); // Handle any errors
    }
};