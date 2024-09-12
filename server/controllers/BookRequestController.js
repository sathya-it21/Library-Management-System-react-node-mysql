const pool = require('../config/db'); // Ensure this path is correct

// Request a book
exports.requestBook = async (req, res) => {
  const { userId, bookId } = req.body;

  // Validate input
  if (!userId || !bookId) {
    return res.status(400).json({ error: 'User ID and Book ID are required' });
  }

  try {
    // Insert request into book_requests table
    await pool.query(
      'INSERT INTO book_requests (user_id, book_id, request_date, status) VALUES (?, ?, NOW(), ?)',
      [userId, bookId, 'Pending']
    );
    res.status(200).json({ message: 'Book request submitted successfully' });
  } catch (error) {
    console.error('Error requesting book:', error);
    res.status(500).json({ error: 'Error requesting book' });
  }
};

exports.getAllRequests = async (req, res) => {
  try {
    // Fetch all book requests along with book and user details
    const [requests] = await pool.query(`
      SELECT 
      r.*, 
      b.title, 
      b.isbn, 
      b.remaining_quantity,
      a.name AS author,
       g.name AS genre, 
       u.name as user
      FROM book_requests r
      JOIN books b ON r.book_id = b.id
      JOIN authors a ON b.author_id = a.id
      JOIN genres g ON b.genre_id = g.id
      JOIN users u ON r.user_id = u.id
    `);
    res.status(200).json(requests);
  } catch (error) {
    console.error('Error fetching all requests:', error);
    res.status(500).json({ error: 'Error fetching all requests' });
  }
};

// Get user requests
exports.getUserRequests = async (req, res) => {
  const { userId } = req.params;

  // Validate input
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    // Fetch user requests
    const [requests] = await pool.query(
      'SELECT r.*, b.title, b.author, b.genre, b.isbn FROM book_requests r JOIN books b ON r.book_id = b.id WHERE r.user_id = ?',
      [userId]
    );
    res.status(200).json(requests);
  } catch (error) {
    console.error('Error fetching user requests:', error);
    res.status(500).json({ error: 'Error fetching user requests' });
  }
};

// Update request status
exports.updateRequestStatus = async (req, res) => {
  const { requestId, status } = req.body;
  console.log("called");
  try {
    

      const [request] = await pool.query('SELECT book_id FROM book_requests WHERE id = ?', [requestId]);
      if (request.length === 0) throw new Error('Request not found');
      console.log(request[0]);
      const bookId = request[0].book_id;

      // Update the request status
      await pool.query('UPDATE book_requests SET status = ? WHERE id = ?', [status, requestId]);

      if (status === 'Approved') {
        console.log(" this is approved");
        // Update the book quantity
        const [book] = await pool.query('SELECT quantity, remaining_quantity FROM books WHERE id = ?', [bookId]);
        if (book.length === 0) throw new Error('Book not found');
        
        const remainingQuantity = book[0].remaining_quantity - 1;

        if (remainingQuantity <= 0) {
          await pool.query('UPDATE books SET remaining_quantity = 0, is_available = 0 WHERE id = ?', [bookId]);
        } else {
          console.log(`setting remaining quantity ${remainingQuantity}`);
          await pool.query('UPDATE books SET remaining_quantity = ? WHERE id = ?', [remainingQuantity, bookId]);
        }
      }

      // Commit the transaction
      

      res.status(200).json({ message: 'Request status updated successfully' });
    
  } catch (error) {
    console.error('Error updating request status:', error);
    res.status(500).json({ error: 'Error updating request status' });
  }
};



// Approve Book Request and Insert into issued_books
exports.approveRequests= async (req, res) => {
  const { requestId, userId, bookId } = req.body; 
  console.log(userId);
  try {
    // Update the status of the request to 'Approved'
    await pool.query('UPDATE book_requests SET status = "Approved" WHERE id = ?', [requestId]);

    // Insert into issued_books
    await pool.query(
      'INSERT INTO issued_books (request_id, user_id, book_id, approval_date) VALUES (?, ?, ?, CURDATE())',
      [requestId, userId, bookId]
    );

    const [book] = await pool.query('SELECT quantity, remaining_quantity FROM books WHERE id = ?', [bookId]);
        if (book.length === 0) throw new Error('Book not found');
        
        const remainingQuantity = book[0].remaining_quantity - 1;

        if (remainingQuantity <= 0) {
          await pool.query('UPDATE books SET remaining_quantity = 0, is_available = 0 WHERE id = ?', [bookId]);
        } else {
          console.log(`setting remaining quantity ${remainingQuantity}`);
          await pool.query('UPDATE books SET remaining_quantity = ? WHERE id = ?', [remainingQuantity, bookId]);
        }

    res.status(200).json({ message: 'Book request approved and issued record created' });
  } catch (error) {
    console.error('Error approving book request:', error);
    res.status(500).json({ error: 'Error approving book request' });
  }
};


// In your routes file or controller
exports.rejectRequest = async (req, res) => {
  const { requestId } = req.body;

  try {
    await pool.query('UPDATE book_requests SET status = ? WHERE id = ?', ['Rejected', requestId]);
    res.status(200).json({ message: 'Request rejected successfully' });
  } catch (error) {
    console.error('Error rejecting request:', error);
    res.status(500).json({ error: 'Error rejecting request' });
  }
};

