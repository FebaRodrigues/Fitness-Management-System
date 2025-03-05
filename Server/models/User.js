



// models/User.js
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, required: false },
    height: { type: Number, required: false },
    weight: { type: Number, required: false },
    gender: { type: String, required: false },
    goals: [{ type: String }],
    image: { type: String, default: "https://res.cloudinary.com/daacjyk3d/image/upload/v1740376690/fitnessApp/gfo0vamcfcurte2gc4jk.jpg" },
    role: { type: String, enum: ['user', 'admin', 'trainer'], default: 'user' },
    lastLogin: { type: Date }
});

module.exports = mongoose.model('User', userSchema);