import React, { useEffect, useState } from 'react';
import axiosInstance from '../api';
import styles from '../styles/dashboard.module.css'; // Import the CSS module

const AdminDashBoard = () => {
  const [metrics, setMetrics] = useState({
    totalBooks: 0,
    totalAuthors: 0,
    totalGenres: 0,
    issuedBooks: 0,
    pendingRequests: 0,
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await axiosInstance.get('/metrics');
        console.log(response.data);
        setMetrics(response.data);
      } catch (error) {
        console.error('Error fetching metrics', error);
      }
    };

    fetchMetrics();
  }, []);

  return (
    <div className={styles.dashboard}>
      <div className={styles.content}>
        <div className={styles.metrics}>
          <div className={styles.metricItem}>
            <h3>Total Books</h3>
            <p>{metrics.totalBooks}</p>
          </div>
          <div className={styles.metricItem}>
            <h3>Total Authors</h3>
            <p>{metrics.totalAuthors}</p>
          </div>
          <div className={styles.metricItem}>
            <h3>Total Genres</h3>
            <p>{metrics.totalGenres}</p>
          </div>
          <div className={styles.metricItem}>
            <h3>Issued Books</h3>
            <p>{metrics.issuedBooks}</p>
          </div>
          <div className={styles.metricItem}>
            <h3>Pending Requests</h3>
            <p>{metrics.pendingRequests}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoard;
