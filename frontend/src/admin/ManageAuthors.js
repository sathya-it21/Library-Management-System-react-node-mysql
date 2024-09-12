import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api';
import styles from '../styles/table.module.css';

const ManageAuthors = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [authors, setAuthors] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    axiosInstance.get('/authors').then((res) => {
      setAuthors(res.data);
    });
  }, []);

  const handleDelete = async (authorId) => {
    try {
      await axiosInstance.delete(`/authors/${authorId}`);
      setErrorMessage('');
      setAuthors(authors.filter((author) => author.id !== authorId));
    } catch (err) {
      console.error('Error deleting author:', err.response ? err.response.data : err.message);
      setErrorMessage(err.response ? err.response.data.error : 'Error deleting author.');
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-author/${id}`);
  };

  return (
    <div className={styles.container}>
      <h1>Authors</h1>
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      <button className={`${styles.button} ${styles.addButton}`} onClick={() => navigate('/admin/add/authors')}>Add authors</button>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Author</th>
            <th>Biography</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author) => (
            <tr key={author.id}>
              <td>{author.name}</td>
              <td>{author.biography}</td>
              <td>{author.created_at}</td>
              <td>{author.updated_at}</td>
              <td>
                <button className={`${styles.button} ${styles.editButton}`} onClick={() => handleEdit(author.id)}>Edit</button>
                <button className={`${styles.button} ${styles.deleteButton}`} onClick={() => handleDelete(author.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageAuthors;
