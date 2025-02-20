// models/User.js
const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, validate: [isEmail, 'Invalid email'] },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin', 'trainer'], default: 'user' }, // Add role field
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);