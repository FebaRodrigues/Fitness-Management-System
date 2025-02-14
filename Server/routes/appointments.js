// routes/appointment.js

const express = require('express');
const { bookAppointment, getAppointments, updateAppointmentStatus, getAppointmentsForTrainer } = require('../controllers/appointmentController');
const router = express.Router();

router.post('/', bookAppointment);
router.get('/:userId', getAppointments);
router.put('/:appointmentId', updateAppointmentStatus); // Update appointment status
router.get('/trainer/:trainerId', getAppointmentsForTrainer); // Get appointments for a trainer

module.exports = router;