// components/UserDashboard/MyWorkouts.jsx
import { useContext, useState, useEffect } from "react";
import "./Workout.css"; // Ensure this file contains styles
import API from "../../connectApi";
import { AuthContext } from "../../context/AuthContext";

const MyWorkouts = () => {
    const { user } = useContext(AuthContext); // Get the user from AuthContext
    const [workouts, setWorkouts] = useState([]); // State to hold workouts
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(""); // State to manage error messages
    const [category, setCategory] = useState("Strength"); // Default category
    const [exercises, setExercises] = useState([{ name: "", sets: "", reps: "", weight: "", duration: "", distance: "" }]); // State for exercises
    const [notes, setNotes] = useState(""); // State for notes

    // Fetch user's existing workouts
    useEffect(() => {
        if (!user) return;

        const fetchWorkouts = async () => {
            setLoading(true);
            setError(""); // Reset error before fetching
            try {
                const response = await API.get(`/workouts/user/${user._id}`);
                setWorkouts(response.data); // Set workouts in state
            } catch (error) {
                console.error("Error fetching workouts:", error);
                setError("Failed to fetch workouts.");
            } finally {
                setLoading(false);
            }
        };

        fetchWorkouts();
    }, [user]);

    // Handle workout submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            alert("User  not logged in!");
            return;
        }

        // Validate exercises
        if (exercises.length === 0 || exercises.some(ex => !ex.name)) {
            alert("Please provide at least one exercise with a name.");
            return;
        }

        try {
            const response = await API.post("/workouts", {
                userId: user.id,
                category,
                exercises,
                notes,
            });

            if (response.data) {
                alert("Workout created successfully!");
                setWorkouts([...workouts, response.data]); // Add new workout to the list
                setCategory("Strength");
                setExercises([{ name: "", sets: "", reps: "", weight: "", duration: "", distance: "" }]); // Reset exercises
                setNotes(""); // Reset notes
            } else {
                alert("Failed to create workout.");
            }
        } catch (error) {
            console.error("Error submitting workout:", error.response ? error.response.data : error.message);
            alert("Failed to create workout. Try again.");
        }
    };

    // Handle exercise change
    const handleExerciseChange = (index, event) => {
        const { name, value } = event.target;
        const newExercises = [...exercises];
        newExercises[index][name] = value;
        setExercises(newExercises);
    };

    // Add new exercise input
    const addExercise = () => {
        setExercises([...exercises, { name: "", sets: "", reps: "", weight: "", duration: "", distance: "" }]);
    };

    // Remove exercise input
    const removeExercise = (index) => {
        const newExercises = exercises.filter((_, i) => i !== index);
        setExercises(newExercises);
    };

    // Handle workout deletion
    const handleDelete = async (workoutId) => {
        try {
            const response = await API.delete(`/workouts/${workoutId}`);
            if (response.data) {
                setWorkouts(workouts.filter((workout) => workout._id !== workoutId)); // Remove workout from the list
            }
        } catch (error) {
            console.error("Error deleting workout:", error);
            alert("Error deleting workout. Try again.");
        }
    };

    if (!user) {
        return <p>Loading user data...</p>;
    }

    return (
        <div className="workout-container">
            <h2>🏋️‍♂️ My Workouts</h2>

            {/* Workout Form */}
            <form onSubmit={handleSubmit} className="workout-form">
                <label>Category:</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="Strength">Strength</option>
                    <option value="Cardio">Cardio</option>
                    <option value="Flexibility">Flexibility</option>
                    <option value="Endurance">Endurance</option>
                </select>

                <h4>Exercises:</h4>
                {exercises.map((exercise, index) => (
                    <div key={index} className="exercise">
                        <input
                            type="text"
                            name="name"
                            placeholder="Exercise Name"
                            value={exercise.name}
                            onChange={(e) => handleExerciseChange(index, e)}
                            required
                        />
                        <input
                            type="number"
                            name="sets"
                            placeholder="Sets"
                            value={exercise.sets}
                            onChange={(e) => handleExerciseChange(index, e)}
                        />
                        <input
                            type="number"
                            name="reps"
                            placeholder="Reps"
                            value={exercise.reps}
                            onChange={(e) => handleExerciseChange(index, e)}
                        />
                        <input
                            type="number"
                            name="weight"
                            placeholder="Weight (lbs)"
                            value={exercise.weight}
                            onChange={(e) => handleExerciseChange(index, e)}
                        />
                        <input
                            type="number"
                            name="duration"
                            placeholder="Duration (mins)"
                            value={exercise.duration}
                            onChange={(e) => handleExerciseChange(index, e)}
                        />
                        <input
                            type="number"
                            name="distance"
                            placeholder="Distance (km)"
                            value={exercise.distance}
                            onChange={(e) => handleExerciseChange(index, e)}
                        />
                        <button type="button" onClick={() => removeExercise(index)}>Remove</button>
                    </div>
                ))}
                <button type="button" onClick={addExercise}>Add Exercise</button>

                <label>Notes:</label>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />

                <button type="submit">Create Workout</button>
            </form>

            {/* Error Message */}
            {error && <p className="error-message">{error}</p>}

            {/* Workout List */}
            <h2>📋 Your Workouts</h2>
            {loading ? (
                <p>Loading workouts...</p>
            ) : workouts.length > 0 ? (
                <ul className="workout-list">
                    {workouts.map((workout) => (
                        <li key={workout._id} className="workout-item">
                            <div>
                                <strong>{workout.category}</strong> - {new Date(workout.date).toLocaleDateString()}
                                <p>Notes: {workout.notes}</p>
                                <h4>Exercises:</h4>
                                <ul>
                                    {workout.exercises.map((exercise, index) => (
                                        <li key={index}>
                                            {exercise.name} - {exercise.sets} sets, {exercise.reps} reps
                                            {exercise.weight ? `, ${exercise.weight} lbs` : ""}
                                            {exercise.duration ? `, Duration: ${exercise.duration} mins` : ""}
                                            {exercise.distance ? `, Distance: ${exercise.distance} km` : ""}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <button onClick={() => handleDelete(workout._id)} className="delete-btn">❌</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No workouts found. Start tracking your workouts!</p>
            )}
        </div>
    );
};

export default MyWorkouts;