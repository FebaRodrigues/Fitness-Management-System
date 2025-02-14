
// models/User.js
const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, validate: [isEmail, 'Invalid email'] },
    password: { type: String, required: true },
    phone: { type: String, required: false }, 
    role: { type: String, enum: ['client', 'admin'], default: 'client' },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);