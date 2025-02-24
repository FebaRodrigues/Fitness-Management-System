// components/UserDashboard/UserProfile.jsx
import React, { useContext, useEffect, useState } from 'react';

import { getUserById } from '../../api';
import { AuthContext } from '../../context/AuthContext';

const UserProfile = () => {
    const { user } =useContext(AuthContext)
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log("AuthContext user:", user); // ✅ Debug: Check if user is loaded

    useEffect(() => {
        if (!user || !user.id) { 
            console.error("User not found in AuthContext"); // Debug
            setError('User not found');
            setLoading(false);
            return;
        }

        const fetchUserData = async () => {
            try {
                const response = await getUserById(user.id);
                setUserData(response.data);
            } catch (error) {
                setError('Error fetching user data');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [user]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>User Profile</h2>
            <p>Name: {userData?.name}</p>
            <p>Email: {userData?.email}</p>
        </div>
    );
};

export default UserProfile;
