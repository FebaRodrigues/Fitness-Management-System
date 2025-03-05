// src/components/Trainer/TrainerLogin.jsx
import React, { useContext, useState } from "react";
import { loginTrainer } from "../../api";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/TrainerStyle.css";
import Navbar from "../Navbar";
import { AuthContext } from "../../context/AuthContext";

const TrainerLogin = () => {
  const { setTrainerData } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginTrainer(email, password);
      console.log("Login response:", response.data);
      localStorage.setItem("token", response.data.token);
      setTrainerData(response.data.trainer);
      console.log("Stored trainer in localStorage:", JSON.parse(localStorage.getItem("trainer")));
      navigate("/trainer/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid credentials or server error");
    }
  };

  return (
    <div>
      <Navbar />
      <h2>Trainer Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
      <p>
        Don't have an account? <Link to="/trainers/register">Register here</Link>
      </p>
    </div>
  );
};

export default TrainerLogin;