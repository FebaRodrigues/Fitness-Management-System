// src/components/UserLogin.jsx
// import React, { useState } from "react";
// import { loginUser } from "../api"; // Import the loginUser function
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import "../styles/UserStyle.css"; // Import CSS
// import Navbar from "./Navbar";
// import { useAuth } from "../context/AuthContext";

// const UserLogin = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await loginUser(email, password);
//       localStorage.setItem("token", response.data.token);
//       localStorage.setItem("role", response.data.role);
//       navigate("/user/dashboard");
//     } catch (error) {
//       console.error("Login failed:", error);
//       alert("Login failed. Please check your credentials.");
//     }
//   };

//   return (
//     <div className="login-container">
//         <Navbar/>
//       <div className="login-box">
//         <h2>Login</h2>
//         <form onSubmit={handleLogin}>
//           <div className="input-group">
//           <label>Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="input-group">
//           <label>Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit">Login as User</button>
//         </form>
//         <p className="signup-text">
//           Don't have an account? <Link to="/users/register">Sign Up</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default UserLogin;

import React, { useContext, useState } from "react";
import { loginUser } from "../api"; // Import login API
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/UserStyle.css";
import Navbar from "./Navbar";
import { AuthContext } from "../context/AuthContext";


const UserLogin = () => {
  const { login } = useContext(AuthContext); // Use Auth Context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(email, password);
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("userId", user.id);

      login(user); // Save user data in context

      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (user.role === "trainer") {
        navigate("/trainer/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-container">
      <Navbar />
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <p className="signup-text">
          Don't have an account? <Link to="/users/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
