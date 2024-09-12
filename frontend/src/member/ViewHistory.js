import React, { useState, useEffect } from 'react';
import axiosInstance from '../api'; // Make sure this path is correct based on your file structure
import styles from '../styles/table.module.css';

const ViewHistory = () => {
  const [history, setHistory] = useState({ issuedBooks: [], bookRequests: [] });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserHistory = async () => {
      const userId = localStorage.getItem('userId'); // Assuming user ID is stored in localStorage
      try {
        const response = await axiosInstance.get(`/user/history/${userId}`);
        setHistory(response.data);
      } catch (err) {
        console.error('Error fetching user history:', err);
        setError('Error fetching user history');
      }
    };

    fetchUserHistory();
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div className={styles.container}>
      <h2>View History</h2>
      <div className={styles.container}>
        <h3>Issued Books</h3>
        {history.issuedBooks.length === 0 ? (
          <p>No issued books found.</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>ISBN</th>
                <th>Author</th>
                <th>Approval Date</th>
                <th>Return Date</th>
                <th>Fine Amount</th>
              </tr>
            </thead>
            <tbody>
              {history.issuedBooks.map((book) => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.isbn}</td>
                  <td>{book.author}</td>
                  <td>{new Date(book.approval_date).toLocaleDateString()}</td>
                  <td>{book.return_date ? new Date(book.return_date).toLocaleDateString() : 'Not Returned'}</td>
                  <td>{book.fine_amount || 0} Rupees</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className={styles.container}>
        <h3>Book Requests</h3>
        {history.bookRequests.length === 0 ? (
          <p>No book requests found.</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>ISBN</th>
                <th>Request Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {history.bookRequests.map((request) => (
                <tr key={request.id}>
                  <td>{request.title}</td>
                  <td>{request.isbn}</td>
                  <td>{new Date(request.request_date).toLocaleDateString()}</td>
                  <td>{request.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ViewHistory;
