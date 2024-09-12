// src/components/Signup.js
import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import styles from './styles/form.module.css'; 

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Member');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { name, email, password, role });
      navigate('/login');
    } catch (err) {
      setError('Failed to register user');
    }
  };

  return (
    <div className={styles.container}> 
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <div className={styles.formGroup}> 
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={styles.input} 
          />
        </div>
        <div className={styles.formGroup}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input} 
          />
        </div>
        <div className={styles.formGroup}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input} 
          />
        </div>
        <div className={styles.formGroup}>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className={styles.input} 
          >
            <option value="Member">Member</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <button type="submit" className={styles.button}>Signup</button> 
        {error && <p className={styles.errorMessage}>{error}</p>} 
      </form>
    </div>
  );
};

export default Signup;
