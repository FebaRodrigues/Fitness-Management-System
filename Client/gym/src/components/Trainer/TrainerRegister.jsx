// src/components/Trainer/TrainerRegister.jsx
import React, { useState } from "react";
import { registerTrainer } from "../../api"; // Adjust the import path as necessary
import { useNavigate, Link } from "react-router-dom"; // Import Link for navigation
import "../../styles/TrainerStyle.css"; // Adjust the import path as necessary
import Navbar from "../Navbar"; // Assuming you have a Navbar component 

const TrainerRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [specialties, setSpecialties] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("specialties", specialties.split(",").map(s => s.trim())); // Convert specialties to an array
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await registerTrainer(formData);
      alert("Trainer registration successful!");
      navigate("/trainers/login");
    } catch (error) {
      console.error("Registration failed:", error);
      setError(error.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="trainer-auth-container">
      <Navbar />
      <div className="trainer-auth-card">
        <h2>Sign Up</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleRegister}>
          <label>Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Specialties (comma separated)</label>
          <input
            type="text"
            value={specialties}
            onChange={(e) => setSpecialties(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Profile Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />

          <button type="submit">Register</button>
        </form>
        <p className="auth-switch-text">
          Already have an account? <Link to="/trainers/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default TrainerRegister;