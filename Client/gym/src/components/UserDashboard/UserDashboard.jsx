// src/components/UserDashboard/UserDashboard.jsx
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../../api";
import "../../styles/UserStyle.css";
import UserProfile from "./UserProfile";
import UserNavbar from "../Navbar/UserNavbar";

const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [memberships, setMemberships] = useState([]);

  // Static membership plans
  const plans = [
    { type: "Basic", price: 10, duration: "Monthly" },
    { type: "Premium", price: 25, duration: "Monthly" },
    { type: "Elite", price: 50, duration: "Monthly" },
  ];

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const response = await API.get(`/memberships/user/${user.id}`);
        setMemberships(response.data);
      } catch (error) {
        console.error("Error fetching memberships:", error);
      }
    };
    if (user) fetchMemberships();
  }, [user]);

  const handlePlanSelect = (plan) => {
    navigate("/user/payments", { state: { selectedPlan: plan } });
  };

  if (!user) return <div>Please log in to view your dashboard.</div>;

  return (
    <div className="user-dashboard">
      <UserNavbar />
      <h2>Welcome, {user.name}! Keep pushing your limits!</h2>
      <UserProfile />

      <h3>Choose Your Membership Plan</h3>
      <div className="membership-card-grid">
        {plans.map((plan, index) => (
          <div key={index} className="membership-card">
            <h4>{plan.type}</h4>
            <p><strong>Price:</strong> ${plan.price}</p>
            <p><strong>Duration:</strong> {plan.duration}</p>
            <button onClick={() => handlePlanSelect(plan)}>Select Plan</button>
          </div>
        ))}
      </div>

      <h3>Your Current Memberships</h3>
      {memberships.length > 0 ? (
        <ul>
          {memberships.map((membership) => (
            <li key={membership._id}>
              {membership.planType} - {membership.duration} - ${membership.price} - {membership.status}
            </li>
          ))}
        </ul>
      ) : (
        <p>No memberships yet.</p>
      )}
    </div>
  );
};

export default UserDashboard;