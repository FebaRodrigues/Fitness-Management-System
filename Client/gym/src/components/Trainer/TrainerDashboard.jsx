//src/components/Trainer/TrainerDashboard.jsx
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import API from "../../api";
import { useNavigate } from "react-router-dom";
import TrainerNavbar from "../Navbar/TrainerNav";

const TrainerDashboard = () => {
  const { trainer } = useContext(AuthContext);
  const [clients, setClients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [newProgram, setNewProgram] = useState({
    title: "",
    description: "",
    category: "Strength",
    exercises: [{ name: "", sets: "", reps: "" }],
  });
  const [selectedClient, setSelectedClient] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!trainer || !trainer.id) {
      setError("Trainer not authenticated or missing ID");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const clientsResponse = await API.get(`/trainers/${trainer.id}/clients`);
        const appointmentsResponse = await API.get(`/appointments/trainer/${trainer.id}`);
        setClients(clientsResponse.data);
        setAppointments(appointmentsResponse.data);
      } catch (err) {
        setError("Failed to fetch data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [trainer, navigate]);

  const handleProgramChange = (e, index) => {
    const { name, value } = e.target;
    if (name === "title" || name === "description" || name === "category") {
      setNewProgram({ ...newProgram, [name]: value });
    } else {
      const updatedExercises = [...newProgram.exercises];
      updatedExercises[index][name] = value;
      setNewProgram({ ...newProgram, exercises: updatedExercises });
    }
  };

  const addExercise = () => {
    setNewProgram({
      ...newProgram,
      exercises: [...newProgram.exercises, { name: "", sets: "", reps: "" }],
    });
  };

  const handleCreateProgram = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/workout-programs', newProgram);
      if (selectedClient) {
        await API.post('/workout-programs/assign', {
          programId: response.data.program._id,
          userId: selectedClient,
        });
      }
      alert("Workout program created and assigned successfully!");
      setNewProgram({
        title: "",
        description: "",
        category: "Strength",
        exercises: [{ name: "", sets: "", reps: "" }],
      });
      setSelectedClient("");
    } catch (err) {
      setError("Failed to create workout program: " + err.message);
    }
  };

  const handleStatusUpdate = async (appointmentId, status) => {
    try {
      await API.put(`/appointments/${appointmentId}`, { status });
      const response = await API.get(`/appointments/trainer/${trainer.id}`);
      setAppointments(response.data);
    } catch (err) {
      setError("Failed to update appointment status: " + err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <TrainerNavbar />
      <h2>Trainer Dashboard</h2>
      <h3>Welcome, {trainer.name}</h3>
      <button onClick={() => navigate(`/trainers/profile/${trainer.id}`)}>
        View Profile
      </button>

      <h3>Your Clients</h3>
      {clients.length > 0 ? (
        <ul>
          {clients.map((client) => (
            <li key={client._id}>{client.name} ({client.email})</li>
          ))}
        </ul>
      ) : (
        <p>No clients booked yet.</p>
      )}

      <h3>Create Workout Program</h3>
      <form onSubmit={handleCreateProgram}>
        <input
          type="text"
          name="title"
          value={newProgram.title}
          onChange={handleProgramChange}
          placeholder="Program Title"
          required
        />
        <textarea
          name="description"
          value={newProgram.description}
          onChange={handleProgramChange}
          placeholder="Description"
        />
        <select name="category" value={newProgram.category} onChange={handleProgramChange}>
          <option value="Strength">Strength</option>
          <option value="Cardio">Cardio</option>
          <option value="Flexibility">Flexibility</option>
          <option value="Endurance">Endurance</option>
        </select>
        {newProgram.exercises.map((exercise, index) => (
          <div key={index}>
            <input
              type="text"
              name="name"
              value={exercise.name}
              onChange={(e) => handleProgramChange(e, index)}
              placeholder="Exercise Name"
              required
            />
            <input
              type="number"
              name="sets"
              value={exercise.sets}
              onChange={(e) => handleProgramChange(e, index)}
              placeholder="Sets"
              required
            />
            <input
              type="number"
              name="reps"
              value={exercise.reps}
              onChange={(e) => handleProgramChange(e, index)}
              placeholder="Reps"
              required
            />
          </div>
        ))}
        <button type="button" onClick={addExercise}>Add Exercise</button>
        <select
          value={selectedClient}
          onChange={(e) => setSelectedClient(e.target.value)}
        >
          <option value="">Select Client (Optional)</option>
          {clients.map(client => (
            <option key={client._id} value={client._id}>{client.name}</option>
          ))}
        </select>
        <button type="submit">Create and Assign</button>
      </form>

      <h3>Your Appointments</h3>
      {appointments.length > 0 ? (
        <ul>
          {appointments.map((appt) => (
            <li key={appt._id}>
              User: {appt.userId.name} ({appt.userId.email}) | Date:{" "}
              {new Date(appt.date).toLocaleString()} | Status: {appt.status}
              {appt.status === "pending" && (
                <div>
                  <button onClick={() => handleStatusUpdate(appt._id, "confirmed")}>
                    Confirm
                  </button>
                  <button onClick={() => handleStatusUpdate(appt._id, "canceled")}>
                    Cancel
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No appointments scheduled yet.</p>
      )}
    </div>
  );
};

export default TrainerDashboard;