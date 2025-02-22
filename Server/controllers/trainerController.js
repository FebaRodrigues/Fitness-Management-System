// controllers/trainerController.js
const Trainer = require('../models/Trainer');
const User = require('../models/User');
const Goal = require('../models/Goal');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const uploadToCloudinary = require("../utilities/imageUpload");

const Workout = require('../models/Workout');
const Feedback = require('../models/Feedback'); 
const Payment = require('../models/Payment');


// Register a new trainer
exports.registerTrainer = async (req, res) => {
    const { name, email, password, specialties } = req.body;
    let image=req.file;
    console.log("image",image)

    try {
        const existingTrainer = await Trainer.findOne({ email });
        if (existingTrainer) {
            return res.status(400).json({ message: 'Trainer with this email already exists' });

        }
        
     const cloudinaryRes = await uploadToCloudinary(image.path);
    if (!cloudinaryRes) {
      return res.status(500).json({ error: "Failed to upload image to Cloudinary." });
    }
    console.log("image in cloudinary : ", cloudinaryRes);

    

        const hashedPassword = await bcrypt.hash(password, 10);
        const newTrainer = new Trainer({ name, email, password: hashedPassword, specialties, image:cloudinaryRes });
        await newTrainer.save();

        res.status(201).json({ message: 'Trainer registered successfully', trainerId: newTrainer._id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Login Trainer
exports.loginTrainer = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if trainer exists
        const trainer = await Trainer.findOne({ email });
        if (!trainer) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Compare passwords
        // const isMatch = await bcrypt.compare(password, trainer.password);
        // if (!isMatch) {
        //     return res.status(401).json({ message: "Invalid credentials" });
        // }

        // Generate JWT Token
        const token = jwt.sign(
            { id: trainer._id, role: "trainer" },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Send response
        res.json({ token, role: "trainer" });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: "Server error, please try again later" });
    }
};
// Get all trainers
exports.getAllTrainers = async (req, res) => {
    try {
        const trainers = await Trainer.find();
        res.status(200).json(trainers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a trainer by ID
exports.getTrainerById = async (req, res) => {
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

// Get all clients for a trainer
exports.getClients = async (req, res) => {
    const { trainerId } = req.params;
    try {
        const clients = await User.find({ trainerId }); // Assuming User model has a trainerId field
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get progress for a specific client
exports.getClientProgress = async (req, res) => {
    const { userId } = req.params;
    try {
        const workouts = await Workout.find({ userId });
        const goals = await Goal.find({ userId });
        res.status(200).json({ workouts, goals });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get feedback for a trainer
exports.getFeedbackForTrainer = async (req, res) => {
    const { trainerId } = req.params;
    try {
        const feedback = await Feedback.find({ trainerId });
        res.status(200).json(feedback);
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