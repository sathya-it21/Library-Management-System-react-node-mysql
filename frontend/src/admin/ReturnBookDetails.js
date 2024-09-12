
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api';
import styles from './styles/returnBookDetails.module.css';

const ReturnBookDetails = () => {
  const { id } = useParams();
  const [bookDetails, setBookDetails] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axiosInstance.get(`/issued-books/${id}`);
        setBookDetails(response.data);
      } catch (err) {
        setError('Error fetching book details');
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleReturnBook = async () => {
    try {
      await axiosInstance.patch(`/issued-books/return/${id}`);
      alert('Book returned successfully');
      navigate('/admin/return-book');
    } catch (err) {
      setError('Error returning book');
    }
  };

  if (error) return <p className={styles.error}>{error}</p>;
  if (!bookDetails) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Return Book</h2>
      </div>
      <div className={styles.details}>
        <p><span>User:</span> {bookDetails.user}</p>
        <p><span>Title:</span> {bookDetails.title}</p>
        <p><span>Author ID:</span> {bookDetails.author}</p>
        <p><span>ISBN:</span> {bookDetails.isbn}</p>
        <p><span>Approval Date:</span> {new Date(bookDetails.approval_date).toLocaleDateString()}</p>
        <p><span>Fine Amount:</span> {bookDetails.fine_amount} Rupees</p>
      </div>
      <button className={styles.button} onClick={handleReturnBook}>Return Book</button>
    </div>
  );
};

export default ReturnBookDetails;
