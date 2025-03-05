// src/components/UserDashboard/Notifications.jsx
import React, { useContext, useEffect, useState } from 'react';
import API from '../../api';
import { AuthContext } from '../../context/AuthContext';
import UserNavbar from '../Navbar/UserNavbar';

const Notifications = () => {
    const { user } = useContext(AuthContext);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNotifications = async () => {
            if (!user) return;
            setLoading(true);
            try {
                const response = await API.get(`/notifications/${user.id}`);
                setNotifications(response.data);
                setError(null);
            } catch (error) {
                setError('Failed to fetch notifications');
                console.error('Error fetching notifications:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchNotifications();
    }, [user]);

    const handleMarkAsRead = async (notificationId) => {
        try {
            await API.put(`/notifications/${notificationId}`);
            setNotifications(notifications.map(n => 
                n._id === notificationId ? { ...n, status: 'Read' } : n
            ));
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <UserNavbar />
            <h2>Notifications & Reminders</h2>
            {notifications.length > 0 ? (
                <ul>
                    {notifications.map((notification) => (
                        <li key={notification._id}>
                            <strong>{notification.type}:</strong> {notification.message} - 
                            <em>{notification.status}</em>
                            {notification.status === 'Unread' && (
                                <button onClick={() => handleMarkAsRead(notification._id)}>Mark as Read</button>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No notifications available.</p>
            )}
        </div>
    );
};

export default Notifications;