// controllers/appointmentController.js

const Appointment = require('../models/Appointment');
const nodemailer = require('nodemailer');
const User = require('../models/User')

// Book an appointment
exports.bookAppointment = async (req, res) => {
    const { userId, trainerId, date } = req.body;
    const appointment = new Appointment({ userId, trainerId, date });
    try {
        await appointment.save();
        res.status(201).json({ message: 'Appointment booked successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get appointments for a user
exports.getAppointments = async (req, res) => {
    const { userId } = req.params;
    try {
        const appointments = await Appointment.find({ userId });
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Accept or reject an appointment
exports.updateAppointmentStatus = async (req, res) => {
    const { appointmentId } = req.params;
    const { status } = req.body; // status can be 'confirmed' or 'canceled'

    try {
        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

        appointment.status = status; // Update the status
        await appointment.save();
        res.status(200).json({ message: 'Appointment status updated successfully', appointment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all appointments for a trainer
exports.getAppointmentsForTrainer = async (req, res) => {
    const { trainerId } = req.params;
    try {
        const appointments = await Appointment.find({ trainerId });
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// Function to send email notifications
const sendEmailNotification = async (email, subject, message) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        text: message,
    };

    await transporter.sendMail(mailOptions);
};

// Update appointment status and send notification
exports.updateAppointmentStatus = async (req, res) => {
    const { appointmentId } = req.params;
    const { status } = req.body; // status can be 'confirmed' or 'canceled'

    try {
        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

        appointment.status = status; // Update the status
        await appointment.save();

        // Send notification to user
        const user = await User.findById(appointment.userId);
        await sendEmailNotification(user.email, 'Appointment Status Update', `Your appointment has been ${status}.`);

        res.status(200).json({ message: 'Appointment status updated successfully', appointment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};