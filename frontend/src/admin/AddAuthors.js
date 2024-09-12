import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api'; // Import the configured axios instance
import styles from './styles/form.module.css'; // Import the common styles

const AddAuthors = () => {
  const { id } = useParams(); // Get author ID from URL params
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [biography, setBiography] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchAuthor = async () => {
      if (id) {
        try {
          const response = await axiosInstance.get(`/authors/${id}`);
          console.log(response.data);
          const { name, biography } = response.data;
          setName(name);
          setBiography(biography);
        } catch (err) {
          console.error('Error fetching author:', err.response ? err.response.data : err.message);
          setError('Error fetching author');
        }
      }
    };

    fetchAuthor();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Form values:', { name, biography });
    if (!name || !biography) {
      setError('Name and Bio are required.');
      return;
    }

    try {
      if (id) {
        // Edit existing author
        await axiosInstance.put(`/authors/${id}`, { name, biography });
        setSuccessMessage('Author updated successfully!');
      } else {
        // Add new author
        await axiosInstance.post('/authors', { name, biography });
        setSuccessMessage('Author added successfully!');
      }
      setName('');
      setBiography('');
      setError('');
      setTimeout(() => navigate('/admin/manage-authors'), 2000); // Redirect after a short delay
    } catch (err) {
      console.error('Error saving author:', err.response ? err.response.data : err.message);
      setError('Error saving author: ' + (err.response ? err.response.data.error : err.message));
      setSuccessMessage('');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.h2}>{id ? 'Edit Author' : 'Add Author'}</h2>
      {error && <p className={styles.error}>{error}</p>}
      {successMessage && <p className={styles.success}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="bio" className={styles.label}>Biography</label>
          <textarea
            id="bio"
            value={biography}
            onChange={(e) => setBiography(e.target.value)}
            required
            className={styles.input}
          ></textarea>
        </div>

        <button type="submit" className={styles.button}>
          {id ? 'Update Author' : 'Add Author'}
        </button>
      </form>
    </div>
  );
};

export default AddAuthors;
