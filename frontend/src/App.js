// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import { AuthProvider } from './AuthContext';
import LogoutButton from './components/Logout';
import PrivateRoute from './PrivateRoute.js';
import Admin from './admin/Admin.js';
import Member from './member/Member.js';


const App = () => {
  return (
    <AuthProvider>
    <Router>

     
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/member/*" element={<Member/>} />
        <Route path="/logout" element={<LogoutButton />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
};

export default App;
