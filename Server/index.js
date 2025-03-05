// index.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const session = require('express-session');
const mongoose = require('mongoose');


dotenv.config();
connectDB();

if (!process.env.STRIPE_SECRET_KEY) {
  console.error('Error: STRIPE_SECRET_KEY is not defined in .env');
  process.exit(1);
}

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();

app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true }, // Set secure: true in production with HTTPS
}));


app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// Routes
const membershipRoutes = require('./routes/memberships');
const paymentRoutes = require('./routes/payments');
const notificationRoutes = require('./routes/notifications');
const announcementRoutes = require('./routes/announcements');
// const workoutRoutes = require('./routes/workouts');
// const nutritionRoutes = require('./routes/nutrition');
const appointmentRoutes = require('./routes/appointments');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/users');
const trainerRoutes = require('./routes/trainerRoutes');
const reportRoutes = require('./routes/reports');

const goalRoutes = require('./routes/goals');
const workoutProgramRoutes = require('./routes/workoutPrograms');
const reminderRoutes = require('./routes/reminders');
const workoutLogRoutes = require('./routes/workoutLogs');


app.use('/api/memberships', membershipRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/announcements', announcementRoutes);

app.use('/api/appointments', appointmentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/trainers', trainerRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/workout-programs', workoutProgramRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api/workout-logs', workoutLogRoutes);


const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});