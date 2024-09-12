import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import axiosInstance from '../api.js';  // Make sure axios is installed for making API requests

// Import components
import ManagePublications from './ManagePublications.js';
import ManageGenres from './ManageGenres.js';
import ManageBooks from './ManageBooks.js';
import ManageAuthors from './ManageAuthors.js';
import AdminBookRequests from './AdminBookRequests.js';
import ReturnBook from './ReturnBook.js';
import ReturnBookDetails from './ReturnBookDetails.js';
import ManageUsers from './ManageUsers.js';
import AddBooks from './AddBooks.js';
import AddPublications from './AddPublications.js';
import AddGenres from './AddGenres.js';
import AddAuthors from './AddAuthors.js';
import AdminNav from './AdminNav.js';
import AdminDashBoard from './AdminDashBoard.js';

const Admin = () => {
  const [metrics, setMetrics] = useState({
    totalBooks: 0,
    totalAuthors: 0,
    totalGenres: 0,
    issuedBooks: 0,
    pendingRequests: 0,
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await axiosInstance.get('/metrics');  // Adjust the API endpoint as needed
        setMetrics(response.data);
      } catch (error) {
        console.error('Error fetching metrics', error);
      }
    };

    fetchMetrics();
  }, []);

  return (
    <div className="admin-dashboard">
      <AdminNav />
      
        <Routes>
        <Route path="dashboard" element={<AdminDashBoard/>} />
        <Route path="manage-users" element={<ManageUsers />} />
        <Route path="manage-publications" element={<ManagePublications />} />
          <Route path="manage-genres" element={<ManageGenres />} />
          <Route path="manage-books" element={<ManageBooks />} />
          <Route path="manage-authors" element={<ManageAuthors />} />
          <Route path="book-requests" element={<AdminBookRequests />} />
          <Route path="return-book" element={<ReturnBook />} />
          <Route path="return-book/:id" element={<ReturnBookDetails />} />
          <Route path="add/books" element={<AddBooks />} />
          <Route path="add/publications" element={<AddPublications />} />
          <Route path="add/genres" element={<AddGenres />} />
          <Route path="add/authors" element={<AddAuthors />} />
          <Route path="edit-genre/:id" element={<AddGenres />} />
          <Route path="edit-author/:id" element={<AddAuthors />} />
          <Route path="edit-publication/:id" element={<AddPublications />} />
          <Route path="edit-book/:id" element={<AddBooks />} />
        </Routes>
      </div>
    
  );
};

export default Admin;
