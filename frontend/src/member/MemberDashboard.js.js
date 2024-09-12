import React, { useEffect, useState } from 'react';
import axiosInstance from '../api'; // Make sure to configure this to point to your API
import styles from '../styles/dashboard.module.css'; // Import the CSS module

const MemberDashboard = ({ memberId }) => {
  const [issuedBooks, setIssuedBooks] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchIssuedBooks = async () => {
      memberId=localStorage.getItem('userId');
      try {
        const response = await axiosInstance.get(`/issued-books/total/${memberId}`);
        setIssuedBooks(response.data.issuedBooks);
      } catch (err) {
        console.error('Error fetching issued books:', err.response ? err.response.data : err.message);
        setError('Error fetching issued books.');
      }
    };

    fetchIssuedBooks();
  }, [memberId]);

  return (
    <div className={styles.dashboard}>
      <div className={styles.content}>
        <h1>Member Dashboard</h1>
        {error && <p className="error">{error}</p>}
        <div className={styles.metrics}>
          <div className={styles.metricItem}>
      
          <h3>Issued Books</h3>
          <p>{issuedBooks}</p>
        </div>
        
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;
