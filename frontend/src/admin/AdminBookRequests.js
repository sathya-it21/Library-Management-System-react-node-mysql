import React, { useEffect, useState } from 'react';
import axiosInstance from '../api'; 
import styles from '../styles/table.module.css';
import requeststyle from './styles/bookrequest.module.css';

const AdminBookRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/request'); // Adjust the endpoint URL if needed
        setRequests(response.data.filter(request => request.status === 'Pending'));
        setLoading(false);
      } catch (err) {
        console.error('Error fetching requests:', err);
        setError('Error fetching book requests');
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleUpdateStatus = async (requestId, userId, bookId, action) => {
    try {
      if (action === 'Approve') {
        await axiosInstance.patch('/request/approve', { requestId, userId, bookId });
      } else if (action === 'Reject') {
        await axiosInstance.patch('/request/reject', { requestId });
      }
      setRequests((prevRequests) =>
        prevRequests.filter((req) => req.id !== requestId)
      );
    } catch (err) {
      console.error(`Error updating request status: ${action}`, err);
      alert(`Error updating request status: ${action}`);
    }
  };

  if (loading) return <p className={requeststyle.bookRequestsMessage}>Loading...</p>;
  if (error) return <p className={requeststyle.bookRequestsMessage}>{error}</p>;

  return (
    <div className={styles.container}>
      <h1>Book Requests</h1>
      {requests.length === 0 ? (
        <p className={requeststyle.bookRequestsMessage}>No book requests found.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Request ID</th>
              <th>User</th>
              <th>Book Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>ISBN</th>
              <th>Request Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.user}</td>
                <td>{request.title}</td>
                <td>{request.author}</td>
                <td>{request.genre}</td>
                <td>{request.isbn}</td>
                <td>{new Date(request.request_date).toLocaleDateString()}</td>
                <td>{request.status}</td>
                <td>
                  {request.status === 'Pending' && (
                    <>
                      <button
                        className={requeststyle.approveButton}
                        onClick={() => handleUpdateStatus(request.id, request.user_id, request.book_id, 'Approve')}
                      >
                        Approve
                      </button>
                      <button
                        className={requeststyle.rejectButton}
                        onClick={() => handleUpdateStatus(request.id, request.user_id, request.book_id, 'Reject')}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminBookRequests;
