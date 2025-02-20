import React from 'react';
import Register from './Register';

const AdminDashboard = () => {
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <Register role="admin" />
        </div>
    );
};

export default AdminDashboard;