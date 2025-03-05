// components/UserDashboard/UserProfile.jsx
import React, { useContext, useEffect, useState } from 'react';
import { getUserById, updateUser } from '../../api';
import { AuthContext } from '../../context/AuthContext';
import Footer from '../Footer';
import UserNavbar from '../Navbar/UserNavbar';

const UserProfile = () => {
    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: '',
        height: '',
        weight: '',
        gender: '',
        image: null,
    });
    const [previewImage, setPreviewImage] = useState(null);

    const fetchUserData = async () => {
        try {
            const response = await getUserById();
            console.log("Fetched user data:", response.data);
            setUserData(response.data);
            setFormData({
                name: response.data.name,
                email: response.data.email,
                age: response.data.age?.toString() || '',
                height: response.data.height?.toString() || '',
                weight: response.data.weight?.toString() || '',
                gender: response.data.gender || '',
                image: null,
            });
            setPreviewImage(null);
        } catch (error) {
            console.error("Error fetching user:", error);
            setError('Error fetching user data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!user || !user.id) {
            setError('User not found');
            setLoading(false);
            return;
        }
        fetchUserData();
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prevData) => ({
                ...prevData,
                image: file,
            }));
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataToUpdate = new FormData();
        dataToUpdate.append('name', formData.name);
        dataToUpdate.append('email', formData.email);
        dataToUpdate.append('age', formData.age || ''); 
        dataToUpdate.append('height', formData.height || '');
        dataToUpdate.append('weight', formData.weight || '');
        dataToUpdate.append('gender', formData.gender || '');
        if (formData.image) {
            dataToUpdate.append('image', formData.image);
        }
    
        console.log("Sending FormData:");
        for (let [key, value] of dataToUpdate.entries()) {
            console.log(`${key}: ${value}`);
        }
    
        try {
            const response = await updateUser(dataToUpdate);
            console.log("Updated user data from server:", response.data);
    
            setUserData(response.data);
            setFormData({
                name: response.data.name,
                email: response.data.email,
                age: response.data.age?.toString() || '',
                height: response.data.height?.toString() || '',
                weight: response.data.weight?.toString() || '',
                gender: response.data.gender || '',
                image: null,
            });
            setPreviewImage(null);
            setIsEditing(false);
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating user:", error.response?.data || error.message);
            setError('Error updating user data: ' + (error.response?.data?.error || error.message));
        }
    };
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <UserNavbar />
            <h2>Your Fitness Profile</h2>
            <div className="image-container">
                <img
                    src={previewImage || userData?.image || "https://res.cloudinary.com/daacjyk3d/image/upload/v1740376690/fitnessApp/gfo0vamcfcurte2gc4jk.jpg"}
                    alt="Profile"
                    style={{ width: '150px', height: '150px', borderRadius: '50%' }}
                    onError={(e) => (e.target.src = "https://res.cloudinary.com/daacjyk3d/image/upload/v1740376690/fitnessApp/gfo0vamcfcurte2gc4jk.jpg")}
                />
            </div>
            {isEditing ? (
                <form onSubmit={handleSubmit}>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        required
                    />
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                    />
                    <label>Age</label>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="Age"
                    />
                    <label>Height (cm)</label>
                    <input
                        type="number"
                        name="height"
                        value={formData.height}
                        onChange={handleChange}
                        placeholder="Height (cm)"
                    />
                    <label>Weight (kg)</label>
                    <input
                        type="number"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        placeholder="Weight (kg)"
                    />
                    <label>Gender</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    <label>Profile Image</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    <button type="submit">Save Changes</button>
                    <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                </form>
            ) : (
                <div>
                    <p>Name: {userData?.name}</p>
                    <p>Email: {userData?.email}</p>
                    <p>Age: {userData?.age || 'Not set'}</p>
                    <p>Height: {userData?.height ? `${userData.height} cm` : 'Not set'}</p>
                    <p>Weight: {userData?.weight ? `${userData.weight} kg` : 'Not set'}</p>
                    <p>Gender: {userData?.gender || 'Not set'}</p>
                    <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                </div>
            )}
            {/* <Footer /> */}
        </div>
    );
};

export default UserProfile;