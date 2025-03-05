// src/components/Trainer/WorkoutPlans.jsx
import React, { useContext, useEffect, useState } from 'react';
import API from '../../api';
import { AuthContext } from '../../context/AuthContext';

const WorkoutPlans = () => {
  const { trainer } = useContext(AuthContext);
  const [workoutPrograms, setWorkoutPrograms] = useState([]);
  const [newProgram, setNewProgram] = useState({
    title: '',
    description: '',
    category: 'Strength',
    exercises: [{ name: '', sets: '', reps: '' }],
  });
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch trainer's workout programs
        const programsResponse = await API.get(`/workout-programs/${trainer.id}`);
        setWorkoutPrograms(programsResponse.data);

        // Fetch trainer's clients
        const clientsResponse = await API.get(`/trainers/${trainer.id}/clients`);
        setClients(clientsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [trainer]);

  const handleProgramChange = (e, index) => {
    const { name, value } = e.target;
    if (name === 'title' || name === 'description' || name === 'category') {
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
      exercises: [...newProgram.exercises, { name: '', sets: '', reps: '' }],
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
      setWorkoutPrograms([...workoutPrograms, response.data.program]);
      setNewProgram({
        title: '',
        description: '',
        category: 'Strength',
        exercises: [{ name: '', sets: '', reps: '' }],
      });
      setSelectedClient('');
      alert('Workout program created successfully!');
    } catch (error) {
      console.error('Error creating workout program:', error);
    }
  };

  return (
    <div>
      <h2>Workout Plans</h2>
      <h3>Your Created Plans</h3>
      {workoutPrograms.length > 0 ? (
        <ul>
          {workoutPrograms.map((program) => (
            <li key={program._id}>
              {program.title} - {program.category} ({program.exercises.length} exercises)
              {program.userId && ` - Assigned to User ${program.userId}`}
            </li>
          ))}
        </ul>
      ) : (
        <p>No workout plans created yet.</p>
      )}

      <h3>Create New Workout Plan</h3>
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
          {clients.map((client) => (
            <option key={client._id} value={client._id}>{client.name}</option>
          ))}
        </select>
        <button type="submit">Create and Assign</button>
      </form>
    </div>
  );
};

export default WorkoutPlans;