// controllers/trainerController.js
const Trainer = require('../models/Trainer');
const User = require('../models/User');
const Goal = require('../models/Goal');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uploadToCloudinary = require("../utilities/imageUpload");
const Workout = require('../models/WorkoutLog');
 
const Payment = require('../models/Payment');
const Appointment = require('../models/Appointment');
const nodemailer = require('nodemailer');

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
  
  exports.updateAppointmentStatus = async (req, res) => {
    const { appointmentId } = req.params;
    const { status } = req.body;
    console.log("Updating appointment:", appointmentId, "with status:", status); // Debug
  
    try {
      const appointment = await Appointment.findById(appointmentId);
      console.log("Found appointment:", appointment); // Debug
      if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
  
      appointment.status = status;
      await appointment.save();
      console.log("Updated appointment:", appointment); // Debug
  
      const user = await User.findById(appointment.userId);
      console.log("Found user:", user); // Debug
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      await sendEmailNotification(user.email, 'Appointment Status Update', `Your appointment has been ${status}.`);
      console.log("Email notification sent to:", user.email); // Debug
  
      res.status(200).json({ message: 'Appointment status updated successfully', appointment });
    } catch (error) {
      console.error("Error in updateAppointmentStatus:", error); // Log detailed error
      res.status(500).json({ error: "Failed to update appointment status: " + error.message });
    }
  };



// Register a new trainer
exports.registerTrainer = async (req, res) => {
    const { name, email, password, specialties } = req.body;
    let image = req.file;

    try {
        const existingTrainer = await Trainer.findOne({ email });
        if (existingTrainer) {
            return res.status(400).json({ message: 'Trainer with this email already exists' });
        }

        const cloudinaryRes = await uploadToCloudinary(image.path);
        if (!cloudinaryRes) {
            return res.status(500).json({ error: "Failed to upload image to Cloudinary." });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        const newTrainer = new Trainer({ 
            name, 
            email, 
            password: hashedPassword, // Store the hashed password
            specialties, 
            image: cloudinaryRes 
        });
        await newTrainer.save();

        res.status(201).json({ message: 'Trainer registered successfully', trainerId: newTrainer._id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Login Trainer
exports.loginTrainer = async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log("Login attempt with email:", email); // Log the email
        const trainer = await Trainer.findOne({ email });
        
        // Check if the trainer exists
        if (!trainer) {
            console.log("Trainer not found"); // Log if trainer is not found
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, trainer.password);
        if (!isMatch) {
            console.log("Password does not match"); // Log if password does not match
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: trainer._id, role: trainer.role }, // Include the role from the trainer document
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Return the token and role
        res.json({ token, role: trainer.role ,trainer});
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: "Server error, please try again later" });
    }
};

     


// Get all trainers
exports.getAllTrainers = async (req, res) => {
    try {
        const trainers = await Trainer.find();
        res.status(200).json(trainers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a trainer's profile by ID
exports.getTrainerProfileById = async (req, res) => {
    const { trainerId } = req.params; // Ensure this is being extracted correctly
    try {
        const trainer = await Trainer.findById(trainerId);
        if (!trainer) return res.status(404).json({ message: 'Trainer not found' });
        res.status(200).json(trainer);
    } catch (error) {
        console.error("Error fetching trainer profile:", error); // Log the error for debugging
        res.status(500).json({ error: error.message });
    }
};

// // Update a trainer's profile
// exports.updateTrainerProfile = async (req, res) => {
//     const { trainerId } = req.params;
//     const { name, email, specialties, phone, bio } = req.body; // Explicitly extract specialties[]
//     let image = req.file;
  
//     console.log("Incoming req.body:", req.body);
//     console.log("Incoming req.file:", req.file);
  
//     try {
//       // Construct updateData with proper handling of specialties
//       let updateData = {};

//     if (name) updateData.name = name;
//     if (email) updateData.email = email;
//     // Explicitly handle specialties
//     console.log("Raw specialties from req.body:", specialties); // Debug raw value
//     if (specialties !== undefined) {
//       updateData.specialties = Array.isArray(specialties) ? specialties : [specialties];
//       console.log("Processed specialties for update:", updateData.specialties); // Debug processed value
//     }
//     if (phone) updateData.phone = phone;
//     if (bio) updateData.bio = bio;
  
//       if (image) {
//         const cloudinaryRes = await uploadToCloudinary(image.path);
//         if (!cloudinaryRes) {
//             console.error("Cloudinary upload failed");
//           return res.status(500).json({ error: "Failed to upload image to Cloudinary." });
//         }
//         console.log("Cloudinary response:", cloudinaryRes);
//         updateData.image = cloudinaryRes;
//       }
  
//       console.log("Data to update in DB:", updateData);
  
//       const trainer = await Trainer.findByIdAndUpdate(
//         trainerId,
//         { $set: updateData }, // Use $set to ensure partial updates
//         { new: true, runValidators: true }
//       );
  
//       if (!trainer) return res.status(404).json({ message: "Trainer not found" });
  
//       console.log("Updated trainer document from DB:", trainer);
//       res.status(200).json(trainer);
//     } catch (error) {
//       console.error("Error updating trainer profile:", error);
//       res.status(500).json({ error: error.message });
//     }
//   };

// Delete a trainer
exports.deleteTrainer = async (req, res) => {
    const { trainerId } = req.params;
    try {
        const trainer = await Trainer.findByIdAndDelete(trainerId);
        if (!trainer) return res.status(404).json({ message: 'Trainer not found' });
        res.status(200).json({ message: 'Trainer deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all clients for a trainer
exports.getClients = async (req, res) => {
    const { trainerId } = req.params;
    console.log("Fetching clients for trainerId:", trainerId);
    try {
      const appointments = await Appointment.find({ trainerId, status: "confirmed" });
      console.log("Found appointments:", appointments);
      if (appointments.length === 0) {
        console.log("No confirmed appointments found for trainerId:", trainerId);
        return res.status(200).json([]);
      }
      const clientIds = [...new Set(appointments.map((appt) => appt.userId.toString()))];
      console.log("Client IDs:", clientIds);
      const clients = await User.find({ _id: { $in: clientIds } });
      console.log("Fetched clients:", clients);
      res.status(200).json(clients);
    } catch (error) {
      console.error("Error in getClients:", error);
      res.status(500).json({ error: "Failed to fetch clients: " + error.message });
    }
  };

// Get progress for a specific client
exports.getClientProgress = async (req, res) => {
    const { userId } = req.params;
    try {
        const workouts = await Workout.find({ userId });
        const goals = await Goal.find({ userId });
        res.status(200).json({ workouts, goals });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get feedback for a trainer
exports.getFeedbackForTrainer = async (req, res) => {
    const { trainerId } = req.params;
    try {
        const feedback = await Feedback.find({ trainerId });
        res.status(200).json(feedback);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get trainer earnings
exports.getTrainerEarnings = async (req, res) => {
    const { trainerId } = req.params;
    try {
        const payments = await Payment.find({ trainerId });
        const totalEarnings = payments.reduce((total, payment) => total + payment.amount, 0);
        res.status(200).json({ totalEarnings });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateTrainerProfile = async (req, res) => {
  const { trainerId } = req.params;
  const { name, email, specialties, phone, bio, availability } = req.body;
  let image = req.file;

  try {
    let specialtiesArray = Array.isArray(specialties)
      ? specialties.map((s) => s.trim())
      : typeof specialties === "string"
      ? specialties.split(",").map((s) => s.trim())
      : [];
    let updateData = { name, email, specialties: specialtiesArray, phone, bio };
    if (availability) updateData.availability = JSON.parse(availability);
    if (image) updateData.image = await uploadToCloudinary(image.path);

    const trainer = await Trainer.findByIdAndUpdate(trainerId, updateData, { new: true });
    if (!trainer) return res.status(404).json({ message: "Trainer not found" });
    res.status(200).json(trainer);
  } catch (error) {
    console.error("Error updating trainer profile:", error);
    res.status(500).json({ error: error.message });
  }
};