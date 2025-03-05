// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedTrainer = localStorage.getItem("trainer");
  const initialTrainer = storedTrainer
    ? {
        ...JSON.parse(storedTrainer),
        id: JSON.parse(storedTrainer).id || JSON.parse(storedTrainer)._id,
      }
    : null;

  const [user, setUser] = useState(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
  );
  const [trainer, setTrainer] = useState(initialTrainer);

  useEffect(() => {
    const storedTrainer = localStorage.getItem("trainer");
    if (storedTrainer && !trainer) {
      const parsedTrainer = JSON.parse(storedTrainer);
      setTrainer({
        ...parsedTrainer,
        id: parsedTrainer.id || parsedTrainer._id,
      });
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setTrainer(null);
    localStorage.removeItem("trainer");
    localStorage.removeItem("token");
  };

  const setTrainerData = (trainerData) => {
    const normalizedTrainer = {
      ...trainerData,
      id: trainerData._id || trainerData.id,
    };
    console.log("Setting trainer data:", normalizedTrainer); // Debug
    setTrainer(normalizedTrainer);
    localStorage.setItem("trainer", JSON.stringify(normalizedTrainer));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, trainer, setTrainerData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);