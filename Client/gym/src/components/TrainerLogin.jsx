import React, { useState } from "react";
import { loginTrainer } from "../api";
import { useNavigate, Link } from "react-router-dom"; // Import Link for navigation
import "../styles/TrainerStyle.css";
import Navbar from "./Navbar";


const TrainerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginTrainer(email, password);
      localStorage.setItem("token", response.data.token);
      navigate("/trainer/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid credentials, please try again.");
    }
  };

  return (
    <div className="trainer-auth-container">
        <Navbar/>
      <div className="trainer-auth-card">
        <h2>Trainer Login</h2>
        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <button type="submit">Login</button>
        </form>
        <p className="auth-switch-text">
          Don't have an account? <Link to="/trainers/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default TrainerLogin;
