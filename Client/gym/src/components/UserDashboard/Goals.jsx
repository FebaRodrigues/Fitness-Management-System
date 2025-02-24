//components/UserDashboard/Feedback.jsx
import { useContext, useState, useEffect } from "react";
import "./Goal.css"; // Ensure this file contains styles
import API from "../../connectApi";
import { AuthContext } from "../../context/AuthContext";

const UserGoalForm = () => {
  const { user } = useContext(AuthContext);
  const [goalType, setGoalType] = useState("weight loss");
  const [currentValue, setCurrentValue] = useState("");
  const [targetValue, setTargetValue] = useState("");
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch user's existing goals
  useEffect(() => {
    if (!user) return;

    const fetchGoals = async () => {
      setLoading(true);
      setError(""); // Reset error before fetching
      try {
        const response = await API.get(`/goals/${user.id}`);
        if (response.data.success) {
          setGoals(response.data.goals);
        } else {
          setError("Failed to fetch goals.");
        }
      } catch (error) {
        console.error(
          "Error fetching goals:",
          error.response ? error.response.data : error.message
        );
        setError(error.response?.data?.message || "Failed to load goals.");
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, [user]);

  // Handle goal submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("User not logged in!");
      return;
    }

    try {
      const response = await API.post("/goals", {
        userId: user.id,
        goalType,
        targetValue: Number(targetValue),
        currentValue: Number(currentValue),
      });

      if (response.data.success) {
        alert("Goal set successfully!");
        setGoals([...goals, response.data.goal]);
        setCurrentValue("");
        setTargetValue("");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error submitting goal:", error.message);
      alert("Failed to set goal. Try again.");
    }
  };

  // Handle goal deletion
  const handleDelete = async (goalId) => {
    try {
      const response = await API.delete(`/goals/${goalId}`);
      if (response.data.success) {
        setGoals(goals.filter((goal) => goal._id !== goalId));
      }
    } catch (error) {
      console.error("Error deleting goal:", error.message);
      alert("Error deleting goal. Try again.");
    }
  };

  if (!user) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="goal-container">
      <h2>🏆 Set Your Fitness Goal</h2>

      {/* Goal Form */}
      <form onSubmit={handleSubmit} className="goal-form">
        <label>Goal Type:</label>
        <select value={goalType} onChange={(e) => setGoalType(e.target.value)}>
          <option value="weight loss">Weight Loss</option>
          <option value="muscle gain">Muscle Gain</option>
          <option value="endurance">Endurance</option>
        </select>

        <label>Target Value:</label>
        <input
          type="number"
          value={targetValue}
          onChange={(e) => setTargetValue(e.target.value)}
          required
        />

        <label>Current Value:</label>
        <input
          type="number"
          value={currentValue}
          onChange={(e) => setCurrentValue(e.target.value)}
          required
        />

        <button type="submit">Save Goal</button>
      </form>

      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}

      {/* Goal List */}
      <h2>📋 Your Goals</h2>
      {loading ? (
        <p>Loading goals...</p>
      ) : goals.length > 0 ? (
        <ul className="goal-list">
          {goals.map((goal) => {
            const progressPercentage =
              goal.targetValue > 0
                ? Math.min((goal.currentValue / goal.targetValue) * 100, 100)
                : 0;

            return (
              <li key={goal._id} className="goal-item">
                <div>
                  <strong>{goal.goalType}</strong>: {goal.currentValue} → {goal.targetValue}
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${progressPercentage}%`,
                        backgroundColor: goal.status === "Completed" ? "green" : "blue",
                      }}
                    ></div>
                  </div>
                  <p>Status: <strong>{goal.status}</strong></p>
                </div>
                <button onClick={() => handleDelete(goal._id)} className="delete-btn">❌</button>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No goals set yet. Start tracking your progress!</p>
      )}
    </div>
  );
};

export default UserGoalForm;
