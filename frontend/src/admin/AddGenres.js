import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api'; // Import the configured axios instance
import styles from './styles/form.module.css'; // Import the common styles

const AddGenres = () => {
  const { id } = useParams(); // Get genre ID from URL params
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchGenre = async () => {
        try {
          const response = await axiosInstance.get(`/genres/${id}`);
          setName(response.data.name);
        } catch (err) {
          console.error('Error fetching genre:', err.response ? err.response.data : err.message);
          setError('Failed to fetch genre');
        }
      };
      fetchGenre();
    }
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (id) {
        await axiosInstance.put(`/genres/${id}`, { name });
        alert('Genre updated successfully!');
      } else {
        await axiosInstance.post('/genres', { name });
        alert('Genre added successfully!');
      }
      navigate('/admin/manage-genres');
    } catch (err) {
      console.error('Error saving genre:', err.response ? err.response.data : err.message);
      setError('Error saving genre');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.h2}>{id ? 'Edit Genre' : 'Add Genre'}</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button}>
          {id ? 'Update Genre' : 'Add Genre'}
        </button>
      </form>
    </div>
  );
};

export default AddGenres;
