import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api';
import styles from '../styles/table.module.css';

const ManagePublications = () => {
  const [publications, setPublications] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get('/publications').then((res) => {
      setPublications(res.data);
    });
  }, []);

  const handleDelete = async (publicationId) => {
    try {
      await axiosInstance.delete(`/publications/${publicationId}`);
      setErrorMessage('');
      setPublications(publications.filter((publication) => publication.id !== publicationId));
    } catch (err) {
      console.error('Error deleting publication:', err.response ? err.response.data : err.message);
      setErrorMessage(err.response ? err.response.data.error : 'Error deleting publication.');
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-publication/${id}`);
  };

  return (
    <div className={styles.container}>
      <h1>Publications</h1>
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      <button className={`${styles.button} ${styles.addButton}`} onClick={() => navigate('/admin/add/publications')}>Add publication</button>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Publication</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {publications.map((publication) => (
            <tr key={publication.id}>
              <td>{publication.name}</td>
              <td>{publication.created_at}</td>
              <td>{publication.updated_at}</td>
              <td>
              <button className={`${styles.button} ${styles.editButton}`} onClick={() => handleEdit(publication.id)}>Edit</button>
              <button className={`${styles.button} ${styles.deleteButton}`} onClick={() => handleDelete(publication.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagePublications;
