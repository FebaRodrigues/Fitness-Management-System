// models/User.js
const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, validate: [isEmail, 'Invalid email'] },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin', 'trainer'], default: 'user' },
    image: { type: String, default: "https://res.cloudinary.com/daacjyk3d/image/upload/v1740376690/fitnessApp/gfo0vamcfcurte2gc4jk.jpg" },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);