// controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 


// Register a new user
exports.register = async (req, res) => {
    const { name, email, password, phone } = req.body; // Include phone if needed

    try {
        // Check if the email already exists
        const existingUser  = await User.findOne({ email });
        if (existingUser ) {
            return res.status(400).json({ message: 'User  with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser  = new User({ name, email, password: hashedPassword, phone }); // Save as user
        await newUser .save();

        res.status(201).json({ message: 'User  registered successfully', userId: newUser ._id });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Login user
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User  not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a user
exports.updateUser  = async (req, res) => {
    const { userId } = req.params;
    const updates = req.body;
    try {
        const user = await User.findByIdAndUpdate(userId, updates, { new: true });
        if (!user) return res.status(404).json({ message: 'User  not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a user
exports.deleteUser  = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) return res.status(404).json({ message: 'User  not found' });
        res.status(200).json({ message: 'User  deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};