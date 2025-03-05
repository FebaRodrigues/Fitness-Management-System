// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserRegister from "./components/UserDashboard/UserRegister";
import UserLogin from "./components/UserDashboard/UserLogin";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import TrainerDashboard from "./components/Trainer/TrainerDashboard";
import TrainerProfile from "./components/Trainer/TrainerProfile";
import TrainerRegister from "./components/Trainer/TrainerRegister";
import TrainerLogin from "./components/Trainer/TrainerLogin";
import TrainerNotifications from './components/Trainer/TrainerNotifications';

import UserGoalForm from "./components/UserDashboard/UserGoalForm";

import Appointments from "./components/UserDashboard/Appointments";

import AdminLogin from "./components/Admin/AdminLogin";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminReports from "./components/Admin/AdminReports";
import Home from "./pages/Home";
import About from "./pages/About";
import { AuthProvider } from "./context/AuthContext";
// import { AdminRegistration } from "./components/AdminPages/AdminRegistration/AdminRegistration";
import ProtectedRoute from "./components/ProtectedRoute";
import Membership from "./components/UserDashboard/Membership";
import Payments from "./components/UserDashboard/Payments";
import Notifications from "./components/UserDashboard/Notifications";
import TrainerPayments from "./components/Trainer/TrainerPayments";
import WorkoutPlans from "./components/Trainer/WorkoutPlans";
import AdminMembership from "./components/Admin/AdminMembership";
import AdminPayments from "./components/Admin/AdminPayments";
import Announcements from "./components/Admin/AdminAnnouncements";
import WorkoutLog from "./components/UserDashboard/WorkoutLog";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/users/register" element={<UserRegister />} />
          <Route path="/users/login" element={<UserLogin />} />
          <Route path="/trainers/register" element={<TrainerRegister />} />
          <Route path="/trainers/login" element={<TrainerLogin />} />

          {/* Trainer Protected Routes */}
          <Route
            path="/trainer/dashboard"
            element={<ProtectedRoute isTrainerRoute><TrainerDashboard /></ProtectedRoute>}
          />
          <Route
            path="/trainers/profile/:trainerId"
            element={<ProtectedRoute isTrainerRoute><TrainerProfile /></ProtectedRoute>}
          />
          <Route
            path="/trainer/payments"
            element={<ProtectedRoute isTrainerRoute><TrainerPayments /></ProtectedRoute>}
          />
          <Route
            path="/trainer/workout-plans"
            element={<ProtectedRoute isTrainerRoute><WorkoutPlans /></ProtectedRoute>}
          />
          <Route
    path="/trainer/notifications"
    element={<ProtectedRoute isTrainerRoute><TrainerNotifications /></ProtectedRoute>}
/>

          {/* User Protected Routes */}
          <Route
            path="/user/dashboard"
            element={<ProtectedRoute><UserDashboard /></ProtectedRoute>}
          />
         <Route path="/user/workout-log" element={<ProtectedRoute><WorkoutLog /></ProtectedRoute>} />
          <Route
            path="/user/goals"
            element={<ProtectedRoute><UserGoalForm /></ProtectedRoute>}
          />
         
          <Route
            path="/user/appointments"
            element={<ProtectedRoute><Appointments /></ProtectedRoute>}
          />
        
          <Route
            path="/user/membership"
            element={<ProtectedRoute><Membership /></ProtectedRoute>}
          />
          <Route
            path="/user/payments"
            element={<ProtectedRoute><Payments /></ProtectedRoute>}
          />
          <Route
            path="/user/payments/success"
            element={<ProtectedRoute><Payments /></ProtectedRoute>} // Add success route
          />
          <Route
            path="/user/notifications"
            element={<ProtectedRoute><Notifications /></ProtectedRoute>}
          />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          {/* <Route path="/admin/register" element={<AdminRegistration />} /> */}
          <Route path="/admin/membership" element={<AdminMembership />} />
          <Route path="/admin/payments" element={<AdminPayments />} />
          <Route path="/admin/announcements" element={<Announcements />} />
          <Route path="/admin/reports" element={<AdminReports />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;