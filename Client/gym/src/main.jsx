import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client'
import App from './App'; // Import your App component
import 'bootstrap/dist/css/bootstrap.min.css';

// Create a root for the application
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);