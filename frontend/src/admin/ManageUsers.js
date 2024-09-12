// src/pages/ManageUsers.js
import React, { useState, useEffect } from 'react';
import axiosInstance from '../api';
import styles from '../styles/table.module.css';
import userstyle from './styles/manageuser.module.css'
const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from API
    axiosInstance.get('/users')
      .then(response => {
        // Filter users to only include members
        const members = response.data.filter(user => user.role === 'Member');
        setUsers(members);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleToggleActive = async (id, currentStatus) => {
    try {
      // Toggle the status by sending the opposite of the current status
      const response = await axiosInstance.put(`/users/${id}/toggle`, {
        is_active: !currentStatus,
      });
  
      console.log('User status updated:', response.data);
      // Update the user list to reflect the new status
      setUsers(users.map(user =>
        user.id === id ? { ...user, is_active: !currentStatus } : user
      ));
    } catch (err) {
      console.error('Error updating user status:', err.response ? err.response.data : err.message);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Manage Users</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.is_active ? 'Active' : 'Inactive'}</td>
              <td>
                <button
                  className={user.is_active ? userstyle.deactivateButton : userstyle.activateButton}
                  onClick={() => handleToggleActive(user.id, user.is_active)}
                >
                  {user.is_active ? 'Deactivate' : 'Activate'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
