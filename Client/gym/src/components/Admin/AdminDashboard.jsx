// src/components/Admin/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API, { getAdminProfile, updateAdminProfile } from '../../api';
import AdminNavbar from '../Navbar/AdminNavbar';
import "../../styles/AdminStyle.css";


const AdminDashboard = () => {
  const navigate = useNavigate();
  const [libraryPrograms, setLibraryPrograms] = useState([]);
  const [newProgram, setNewProgram] = useState({
    title: "",
    description: "",
    category: "Strength",
    exercises: [{ name: "", sets: "", reps: "" }],
    isLibraryPlan: true,
  });
  const [adminProfile, setAdminProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileResponse = await getAdminProfile();
        setAdminProfile(profileResponse.data);
        setFormData({ name: profileResponse.data.name, email: profileResponse.data.email });

        const programsResponse = await API.get('/workout-programs/library');
        setLibraryPrograms(programsResponse.data);
      } catch (error) {
        setError('Error fetching data: ' + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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

  const handleCreateLibraryProgram = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/workout-programs', newProgram);
      setLibraryPrograms([...libraryPrograms, response.data.program]);
      setNewProgram({
        title: "",
        description: "",
        category: "Strength",
        exercises: [{ name: "", sets: "", reps: "" }],
        isLibraryPlan: true,
      });
      alert("Library workout program created successfully!");
    } catch (error) {
      console.error('Error creating library program:', error);
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await updateAdminProfile(formData);
      setAdminProfile(response.data.admin);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      setError('Error updating profile: ' + error.message);
    }
  };

  const AddAdmin = () => {
    navigate("/admin/register");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <AdminNavbar />
      {/* Personalized Greeting */}
      {adminProfile && (
        <div style={{ margin: '20px 0' }}>
          <h2>Hi, {adminProfile.name}!</h2>
          <p>Welcome to the Admin Dashboard</p>
        </div>
      )}

      {/* Admin Profile Section */}
      {adminProfile && (
        <div style={{ margin: '20px 0', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
          <h3>Your Profile</h3>
          {isEditing ? (
            <form onSubmit={handleUpdateProfile}>
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleProfileChange}
                  required
                />
              </div>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleProfileChange}
                  required
                />
              </div>
              <button type="submit">Save</button>
              <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
            </form>
          ) : (
            <>
              <p><strong>Name:</strong> {adminProfile.name}</p>
              <p><strong>Email:</strong> {adminProfile.email}</p>
              
              <button onClick={() => setIsEditing(true)}>Edit Profile</button>
            </>
          )}
        </div>
      )}

      {/* <button onClick={AddAdmin}>Add Admin</button> */}

      <h3>Workout Plan Library</h3>
      {libraryPrograms.length > 0 ? (
        <ul>
          {libraryPrograms.map(program => (
            <li key={program._id}>
              {program.title} - {program.category} ({program.exercises.length} exercises)
            </li>
          ))}
        </ul>
      ) : (
        <p>No library plans available.</p>
      )}

      <h3>Create Library Workout Program</h3>
      <form onSubmit={handleCreateLibraryProgram}>
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
        <button type="submit">Create Library Program</button>
      </form>
    </div>
  );
};

export default AdminDashboard;