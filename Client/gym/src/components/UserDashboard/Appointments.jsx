// components/UserDashboard/Appointments.jsx
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import API from "../../api";
import UserNavbar from "../Navbar/UserNavbar";

const Appointments = () => {
  const { user } = useContext(AuthContext);
  const [trainers, setTrainers] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all trainers
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await API.get("/trainers"); // Use getAllTrainers endpoint
        setTrainers(response.data);
      } catch (err) {
        setError("Failed to fetch trainers");
      }
    };

    const fetchAppointments = async () => {
      try {
        const response = await API.get(`/appointments/${user.id}`);
        setAppointments(response.data);
      } catch (err) {
        setError("Failed to fetch appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchTrainers();
    if (user) fetchAppointments();
  }, [user]);

  const handleBookAppointment = async () => {
    if (!selectedTrainer || !appointmentDate) {
      alert("Please select a trainer and date");
      return;
    }

    try {
      const response = await API.post("/appointments", {
        userId: user.id,
        trainerId: selectedTrainer._id,
        date: appointmentDate,
      });
      alert(response.data.message);
      // Refresh appointments
      const updatedAppointments = await API.get(`/appointments/${user.id}`);
      setAppointments(updatedAppointments.data);
      setSelectedTrainer(null);
      setAppointmentDate("");
    } catch (err) {
      setError("Failed to book appointment");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <UserNavbar />
      <h2>Book an Appointment</h2>
      <div>
        <h3>Available Trainers</h3>
        {trainers.map((trainer) => (
          <div key={trainer._id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
            <p><strong>Name:</strong> {trainer.name}</p>
            <p><strong>Specialties:</strong> {trainer.specialties.join(", ")}</p>
            <p><strong>Bio:</strong> {trainer.bio || "No bio available"}</p>
            <button onClick={() => setSelectedTrainer(trainer)}>
              {selectedTrainer?._id === trainer._id ? "Selected" : "Select Trainer"}
            </button>
          </div>
        ))}
      </div>

      {selectedTrainer && (
        <div>
          <h3>Book with {selectedTrainer.name}</h3>
          <input
            type="datetime-local"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
          />
          <button onClick={handleBookAppointment}>Book Appointment</button>
        </div>
      )}

      <h3>Your Appointments</h3>
      {appointments.length > 0 ? (
        <ul>
          {appointments.map((appt) => (
            <li key={appt._id}>
              Trainer ID: {appt.trainerId} | Date: {new Date(appt.date).toLocaleString()} | Status: {appt.status}
            </li>
          ))}
        </ul>
      ) : (
        <p>No appointments booked yet.</p>
      )}
    </div>
  );
};

export default Appointments;