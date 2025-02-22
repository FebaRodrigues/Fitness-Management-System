// index.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
// const authRoutes = require('./routes/auth');
const workoutRoutes = require('./routes/workouts');
const nutritionRoutes = require('./routes/nutrition');
const appointmentRoutes = require('./routes/appointments');
const paymentRoutes = require('./routes/payments');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/users');
const trainerRoutes = require('./routes/trainerRoutes');
const reportRoutes = require('./routes/reports');
const feedbackRoutes = require('./routes/feedback');
const goalRoutes = require('./routes/goals'); 
const messageRoutes = require('./routes/messages'); 
const workoutProgramRoutes = require('./routes/workoutPrograms'); 
const reminderRoutes = require('./routes/reminders'); 
const disputeRoutes = require('./routes/disputes');
const recommendationRoutes = require('./routes/recommendations');

const cors = require('cors');


dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());


// Define your routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/nutrition', nutritionRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/trainers', trainerRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/goals', goalRoutes); 
app.use('/api/messages', messageRoutes); 
app.use('/api/workout-programs', workoutProgramRoutes); 
app.use('/api/reminders', reminderRoutes);
app.use('/api/disputes', disputeRoutes);
app.use('/api/recommendations', recommendationRoutes);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});