// models/Trainer.js
const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcryptjs');

const trainerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    specialties: { type: [String], required: true },
    approved: { type: Boolean, default: false },
    role: { type: String, default: 'trainer' }, // Add role field
    createdAt: { type: Date, default: Date.now },
});



// Hash the password before saving
trainerSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

module.exports = mongoose.model('Trainer', trainerSchema);