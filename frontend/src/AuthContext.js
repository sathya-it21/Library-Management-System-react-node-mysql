// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import axiosInstance, { setAuthToken } from './api'; // Import the configured axios instance

// Create the Auth context
const AuthContext = createContext();

// AuthProvider component to manage authentication state
export const AuthProvider = ({ children }) => {
  // State for storing access and refresh tokens
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken') || '');

  // Set the auth token whenever it changes
  useEffect(() => {
    setAuthToken(token);
  }, [token]);

  // Login function to update tokens and set them in local storage
  const login = (newToken, newRefreshToken) => {
    setToken(newToken);
    setRefreshToken(newRefreshToken);
    localStorage.setItem('token', newToken);
    localStorage.setItem('refreshToken', newRefreshToken);
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
  };

  // Logout function to clear tokens and remove them from local storage
  const logout = () => {
    setToken('');
    setRefreshToken('');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    axiosInstance.defaults.headers.common['Authorization'] = ''; // Remove the token from axios headers
  };

  return (
    <AuthContext.Provider value={{ token, refreshToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth context
export const useAuth = () => useContext(AuthContext);
