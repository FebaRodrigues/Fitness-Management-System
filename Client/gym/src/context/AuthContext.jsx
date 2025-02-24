//context/AuthContext.jsx
// import React, { createContext, useContext, useState } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [user, setUser ] = useState(null);

//     const login = (userData) => {
//         setUser (userData);
//     };

//     const logout = () => {
//         setUser (null);
//         localStorage.removeItem('token');
//         localStorage.removeItem('role');
//     };

//     return (
//         <AuthContext.Provider value={{ user, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => {
//     return useContext(AuthContext);
// };

//gym\src\context\AuthContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

 const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // ✅ Load user from LocalStorage when the app starts
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData)); // ✅ Store user in LocalStorage
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider