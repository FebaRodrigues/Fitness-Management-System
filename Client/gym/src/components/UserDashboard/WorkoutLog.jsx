// src/components/UserDashboard/WorkoutLog.jsx
import React, { useContext, useEffect, useState } from 'react';
import API from '../../api';
import { AuthContext } from '../../context/AuthContext';
import UserNavbar from '../Navbar/UserNavbar';
import '../../styles/WorkoutLog.css';

const WorkoutLog = () => {
    const { user } = useContext(AuthContext);
    const [logs, setLogs] = useState([]);
    const [newLog, setNewLog] = useState({
        exercises: [{ name: '', setsCompleted: '', repsCompleted: '', weight: '' }],
        caloriesBurned: '',
    });
    const [suggestions, setSuggestions] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Static workout plans as per your request
    const assignedWorkoutPlans = [
        { title: 'cardio', category: 'Strength', exercisesCount: 1 },
    ];
    const libraryWorkoutPlans = [
        { title: 'Beginner Strength Program', category: 'Strength', exercisesCount: 2 },
    ];

    const exerciseList = [
        'Bench Press', 'Squat', 'Deadlift', 'Pull-Up', 'Push-Up', 'Lunges',
    ];

    useEffect(() => {
        const fetchLogs = async () => {
            if (!user) return;
            setLoading(true);
            try {
                const response = await API.get(`/workout-logs/${user.id}`);
                setLogs(response.data);
                setError(null);
            } catch (err) {
                setError('Failed to fetch workout logs: ' + err.message);
                console.error('Fetch Error:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchLogs();
    }, [user]);

    const handleExerciseChange = (index, e) => {
        const { name, value } = e.target;
        const updatedExercises = [...newLog.exercises];
        updatedExercises[index][name] = value;

        if (name === 'name' && value.length > 0) {
            const filteredSuggestions = exerciseList.filter(ex =>
                ex.toLowerCase().startsWith(value.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }

        setNewLog({ ...newLog, exercises: updatedExercises });
    };

    const handleSuggestionClick = (index, suggestion) => {
        const updatedExercises = [...newLog.exercises];
        updatedExercises[index].name = suggestion;
        setNewLog({ ...newLog, exercises: updatedExercises });
        setSuggestions([]);
    };

    const addExercise = () => {
        setNewLog({
            ...newLog,
            exercises: [...newLog.exercises, { name: '', setsCompleted: '', repsCompleted: '', weight: '' }],
        });
    };

    const removeExercise = (index) => {
        const updatedExercises = newLog.exercises.filter((_, i) => i !== index);
        if (updatedExercises.length === 0) {
            updatedExercises.push({ name: '', setsCompleted: '', repsCompleted: '', weight: '' });
        }
        setNewLog({ ...newLog, exercises: updatedExercises });
        setSuggestions([]);
    };

    const handleLogSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                userId: user.id,
                exercises: newLog.exercises.map(ex => ({
                    name: ex.name,
                    setsCompleted: Number(ex.setsCompleted) || 0,
                    repsCompleted: Number(ex.repsCompleted) || 0,
                    weight: Number(ex.weight) || 0,
                })),
                caloriesBurned: Number(newLog.caloriesBurned) || 0,
            };

            await API.post('/workout-logs', payload);
            const response = await API.get(`/workout-logs/${user.id}`);
            setLogs(response.data);
            setNewLog({
                exercises: [{ name: '', setsCompleted: '', repsCompleted: '', weight: '' }],
                caloriesBurned: '',
            });
            setError(null);
        } catch (err) {
            setError('Failed to submit workout log: ' + (err.response?.data?.error || err.message));
            console.error('Submit Error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <UserNavbar />
            <div className="workout-log-container">
                <h2>Workout Plans & Logs</h2>
                {loading && <p>Loading...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}

                {/* Assigned Workout Plans */}
                <h3>Your Assigned Workout Plans</h3>
                <div className="card-grid">
                    {assignedWorkoutPlans.map((plan, index) => (
                        <div key={index} className="workout-card">
                            <h4>{plan.title}</h4>
                            <p><strong>Category:</strong> {plan.category}</p>
                            <p><strong>Exercises:</strong> {plan.exercisesCount}</p>
                        </div>
                    ))}
                </div>

                {/* Workout Plan Library */}
                <h3>Workout Plan Library</h3>
                <div className="card-grid">
                    {libraryWorkoutPlans.map((plan, index) => (
                        <div key={index} className="workout-card">
                            <h4>{plan.title}</h4>
                            <p><strong>Category:</strong> {plan.category}</p>
                            <p><strong>Exercises:</strong> {plan.exercisesCount}</p>
                        </div>
                    ))}
                </div>

                {/* Workout Log Form */}
                <h3>Log Your Workout</h3>
                <form onSubmit={handleLogSubmit} className="workout-form">
                    {newLog.exercises.map((exercise, index) => (
                        <div key={index} className="exercise-input">
                            <input
                                type="text"
                                name="name"
                                value={exercise.name}
                                onChange={(e) => handleExerciseChange(index, e)}
                                placeholder="Exercise Name"
                                required
                                disabled={loading}
                            />
                            {exercise.name && suggestions.length > 0 && (
                                <ul className="suggestions">
                                    {suggestions.map((suggestion, i) => (
                                        <li
                                            key={i}
                                            onClick={() => handleSuggestionClick(index, suggestion)}
                                        >
                                            {suggestion}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <input
                                type="number"
                                name="setsCompleted"
                                value={exercise.setsCompleted}
                                onChange={(e) => handleExerciseChange(index, e)}
                                placeholder="Sets"
                                disabled={loading}
                            />
                            <input
                                type="number"
                                name="repsCompleted"
                                value={exercise.repsCompleted}
                                onChange={(e) => handleExerciseChange(index, e)}
                                placeholder="Reps"
                                disabled={loading}
                            />
                            <input
                                type="number"
                                name="weight"
                                value={exercise.weight}
                                onChange={(e) => handleExerciseChange(index, e)}
                                placeholder="Weight (kg)"
                                disabled={loading}
                            />
                            <button
                                type="button"
                                className="remove-btn"
                                onClick={() => removeExercise(index)}
                                disabled={loading || newLog.exercises.length === 1}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={addExercise} disabled={loading}>
                        Add Exercise
                    </button>
                    <input
                        type="number"
                        value={newLog.caloriesBurned}
                        onChange={(e) => setNewLog({ ...newLog, caloriesBurned: e.target.value })}
                        placeholder="Calories Burned"
                        disabled={loading}
                        className="calories-input"
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? 'Submitting...' : 'Log Workout'}
                    </button>
                </form>

                {/* Existing Workout Logs */}
                <h3>Your Workout Logs</h3>
                <ul>
                    {logs.map(log => (
                        <li key={log._id}>
                            Date: {new Date(log.date).toLocaleDateString()} - 
                            Exercises: {log.exercises.map(ex => `${ex.name} (${ex.setsCompleted}x${ex.repsCompleted}, ${ex.weight}kg)`).join(', ')} - 
                            Calories: {log.caloriesBurned}
                            {log.workoutId && ` - Program: ${log.workoutId.title}`}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default WorkoutLog;