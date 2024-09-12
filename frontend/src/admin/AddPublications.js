import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api'; // Import the configured axios instance
import styles from './styles/form.module.css'; // Import the common styles

const AddPublications = () => {
  const { id } = useParams(); // Get publication ID from URL params
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPublication = async () => {
      if (id) {
        try {
          const response = await axiosInstance.get(`/publications/${id}`);
          setName(response.data.name);
        } catch (err) {
          console.error('Error fetching publication:', err.response ? err.response.data : err.message);
          setError('Error fetching publication');
        }
      }
    };

    fetchPublication();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      alert('Publication name is required.');
      return;
    }

    try {
      if (id) {
        await axiosInstance.put(`/publications/${id}`, { name });
        alert('Publication updated successfully!');
      } else {
        await axiosInstance.post('/publications', { name });
        alert('Publication added successfully!');
      }
      navigate('/admin/manage-publications');
    } catch (err) {
      console.error('Error saving publication:', err.response ? err.response.data : err.message);
      setError('Error saving publication');
    }
  };

  return (
    <div className={styles.container}>
      <h2>{id ? 'Edit Publication' : 'Add Publication'}</h2>
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
          {id ? 'Update Publication' : 'Add Publication'}
        </button>
      </form>
    </div>
  );
};

export default AddPublications;
