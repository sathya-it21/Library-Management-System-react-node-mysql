import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api';
import styles from '../styles/table.module.css';
import returnstyle from './styles/returnbook.module.css'; 

const ReturnBook = () => {
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIssuedBooks = async () => {
      try {
        const response = await axiosInstance.get('/issued-books');
        setIssuedBooks(response.data.filter(request => request.return_date === null));
      } catch (err) {
        console.error('Error fetching issued books:', err);
        setError('Error fetching issued books');
      }
    };

    fetchIssuedBooks();
  }, []);

  const handleReturnClick = (issuedBookId) => {
    navigate(`/admin/return-book/${issuedBookId}`);
  };

  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.container}>
      <h1>Issued Books</h1>
      {issuedBooks.length === 0 ? (
        <p className={returnstyle.noBooksMessage}>No issued books available for return.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>User</th>
              <th>Title</th>
              <th>Author</th>
              <th>ISBN</th>
              <th>Approval Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {issuedBooks.map((book) => (
              <tr key={book.id}>
                <td>{book.user}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.isbn}</td>
                <td>{new Date(book.approval_date).toLocaleDateString()}</td>
                <td>
                  <button className={returnstyle.returnButton} onClick={() => handleReturnClick(book.id)}>Return</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReturnBook;
