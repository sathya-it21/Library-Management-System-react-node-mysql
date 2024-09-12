import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api';
import styles from '../styles/table.module.css';


const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    axiosInstance.get('/books/getAll').then((res) => {
      setBooks(res.data);
    });
  }, []);

  const handleDelete = (id) => {
    axiosInstance.delete(`/books/${id}`).then(() => {
      setBooks(books.filter((book) => book.id !== id));
    }).catch((error) => {
      console.error('Error deleting book:', error);
    });
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-book/${id}`);
  };

  return (
    <div className={styles.container}>
      <h1>Books</h1>
      <button className={`${styles.button} ${styles.addButton}`} onClick={() => navigate('/admin/add/books')}>Add books</button>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Publication</th>
            <th>ISBN</th>
            <th>Quantity</th>
            <th>Is Available</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td>{book.publication}</td>
              <td>{book.isbn}</td>
              <td>{book.quantity}</td>
              <td>{book.is_available === 1 ? 'Yes' : 'No'}</td>
              <td>{book.created_at}</td>
              <td>{book.updated_at}</td>
              <td>
                <button className={`${styles.button} ${styles.editButton}`} onClick={() => handleEdit(book.id)}>Edit</button>
                <button className={`${styles.button} ${styles.deleteButton}`} onClick={() => handleDelete(book.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageBooks;
