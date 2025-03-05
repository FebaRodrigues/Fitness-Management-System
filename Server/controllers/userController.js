

// controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const uploadToCloudinary = require("../utilities/imageUpload");

// Register a new user

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    let image = req.file ? req.file.path : null;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        let cloudinaryRes = null;
        if (image) {
            cloudinaryRes = await uploadToCloudinary(image);
            if (!cloudinaryRes) {
                return res.status(500).json({ error: "Failed to upload image to Cloudinary." });
            }
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user with default role
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            image: cloudinaryRes ? cloudinaryRes.secure_url : null,
           
            // No need to specify role here; it defaults to 'user'
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully", userId: newUser._id });
    } catch (error) {
        console.error("Error in register:", error);
        res.status(500).json({ error: error.message });
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
        user.lastLogin = new Date(); // Update lastLogin
        await user.save(); // Save the updated user document
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ 
            message: 'Login successful', 
            token, 
            user: { id: user._id, name: user.name, email: user.email, role: user.role, image: user.image } 
        });
    } catch (error) {
        console.error('Login Error:', error);
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


// Get a user by ID or current user
exports.getUserById = async (req, res) => {
    const userId = req.user.id; // Use the ID from the authenticated user

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User  not found' });

        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: error.message });
    }
};


// Update a user or current user
exports.updateUser = async (req, res) => {
    const userId = req.user.id;
    const updates = {};

    try {
        console.log("req.body:", req.body);
        console.log("req.file:", req.file);

        // Extract fields from req.body
        if (req.body.name) updates.name = req.body.name;
        if (req.body.email) updates.email = req.body.email;
        if (req.body.age) updates.age = Number(req.body.age) || undefined;
        if (req.body.height) updates.height = Number(req.body.height) || undefined;
        if (req.body.weight) updates.weight = Number(req.body.weight) || undefined;
        if (req.body.gender) updates.gender = req.body.gender;

        // Handle image upload
        if (req.file) {
            const cloudinaryRes = await uploadToCloudinary(req.file.path);
            if (!cloudinaryRes) {
                return res.status(500).json({ error: "Failed to upload image to Cloudinary." });
            }
            updates.image = cloudinaryRes; // Use the secure URL
        }

        console.log("Updates to apply:", updates);

        const user = await User.findByIdAndUpdate(
            userId,
            { $set: updates },
            { new: true, runValidators: true }
        );

        if (!user) return res.status(404).json({ message: 'User not found' });

        console.log("Updated user:", user);
        res.status(200).json(user);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: error.message });
    }
};
// Delete a user
exports.deleteUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getConfirmedAppointments = async (req, res) => {
    const { userId } = req.params;
    try {
        const appointments = await Appointment.find({ userId, status: 'confirmed' }).populate('trainerId');
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};