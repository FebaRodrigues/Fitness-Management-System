//models/appointment.js
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User ', required: true },
    trainerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer', required: true },
    date: { type: Date, required: true },
    status: { type: String, default: 'pending' }, // pending, confirmed, canceled
});

module.exports = mongoose.model('Appointment', appointmentSchema);