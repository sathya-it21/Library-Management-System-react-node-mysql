import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api';
import styles from '../styles/table.module.css';

const ManageGenres = () => {
  const [genres, setGenres] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get('/genres').then((res) => {
      setGenres(res.data);
    });
  }, []);

  const handleDelete = async (genreId) => {
    try {
      await axiosInstance.delete(`/genres/${genreId}`);
      setErrorMessage('');
      setGenres(genres.filter((genre) => genre.id !== genreId));
    } catch (err) {
      console.error('Error deleting genre:', err.response ? err.response.data : err.message);
      setErrorMessage(err.response ? err.response.data.error : 'Error deleting genre.');
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-genre/${id}`);
  };

  return (
    <div className={styles.container}>
      <h1>Genres</h1>
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      <button className={`${styles.button} ${styles.addButton}`} onClick={() => navigate('/admin/add/genres')}>Add genres</button>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Genre</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {genres.map((genre) => (
            <tr key={genre.id}>
              <td>{genre.name}</td>
              <td>{genre.created_at}</td>
              <td>{genre.updated_at}</td>
              <td>
              <button className={`${styles.button} ${styles.editButton}`} onClick={() => handleEdit(genre.id)}>Edit</button>
              <button className={`${styles.button} ${styles.deleteButton}`} onClick={() => handleDelete(genre.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageGenres;
