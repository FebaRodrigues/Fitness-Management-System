import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/Style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthProvider from './context/AuthContext';


ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthProvider>
 <App />
    </AuthProvider>
       
   
);