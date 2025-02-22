import React, { useState } from "react";
import { registerTrainer } from "../api";
import { useNavigate, Link } from "react-router-dom"; // Import Link for navigation
import "../styles/TrainerStyle.css";
import Navbar from "./Navbar";

const TrainerRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [specialties, setSpecialties] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("specialties", specialties);
    formData.append("password", password);
    if (image) {
      formData.append("image", image);
    }

    try {
      await registerTrainer(formData);
      alert("Trainer registration successful!");
      navigate("/trainers/login");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="trainer-auth-container">
        <Navbar/>
      <div className="trainer-auth-card">
        <h2>Sign Up</h2>
        <form onSubmit={handleRegister}>
          <label>Full Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label>Specialties</label>
          <input type="text" value={specialties} onChange={(e) => setSpecialties(e.target.value)} required />

          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <label>Profile Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />

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
