const pool = require('../config/db'); // Ensure this path is correct

exports.getAllIssuedBooks = async (req, res) => {
  try {
    const [issuedBooks] = await pool.query(`
      SELECT ib.id,
             b.title,
             b.isbn,
             u.name AS user,
             au.name AS author,
             ib.approval_date,
             ib.return_date,
             ib.fine_amount
      FROM issued_books ib
      JOIN books b ON ib.book_id = b.id
      JOIN users u ON ib.user_id = u.id
      JOIN authors au ON b.author_id = au.id
      ORDER BY ib.approval_date DESC
    `);
    
    res.status(200).json(issuedBooks);
  } catch (error) {
    console.error('Error fetching issued books:', error);
    res.status(500).json({ error: 'Error fetching issued books' });
  }
};


exports.getIssuedBookbyId=async (req, res) => {
  const { id } = req.params;
  try {
    const [issuedBook] = await pool.query(
      `SELECT ib.id,
       b.title,
       u.name AS user,
       au.name AS author,
       b.isbn,
       ib.approval_date,
       DATEDIFF(CURDATE(), ib.approval_date) AS days_since_approval,
       CASE
         WHEN DATEDIFF(CURDATE(), ib.approval_date) > 14
         THEN (DATEDIFF(CURDATE(), ib.approval_date) - 14) * 5
         ELSE 0
       END AS fine_amount
      FROM issued_books ib
      JOIN books b ON ib.book_id = b.id
      JOIN users u ON ib.user_id = u.id
      JOIN authors au ON b.author_id = au.id
      WHERE ib.id = ?;
      `,
      [id]
    );

    if (!issuedBook.length) {
      return res.status(404).json({ error: 'Issued book not found' });
    }

    res.status(200).json(issuedBook[0]);
  } catch (error) {
    console.error('Error fetching issued book details:', error);
    res.status(500).json({ error: 'Error fetching issued book details' });
  }
};

// Return Book and Calculate Fine
exports.returnbook=async (req, res) => {
  const { id } = req.params;
  try {
    // Fetch the approval date to calculate the fine
    const [issuedBook] = await pool.query(
      'SELECT approval_date, fine_amount FROM issued_books WHERE id = ?',
      [id]
    );

    if (!issuedBook.length) {
      return res.status(404).json({ error: 'Issued book not found' });
    }

    const approvalDate = new Date(issuedBook[0].approval_date);
    const currentDate = new Date();
    const daysOverdue = Math.floor((currentDate - approvalDate) / (1000 * 60 * 60 * 24)) - 14;
    const fineAmount = daysOverdue > 0 ? daysOverdue * 5 : 0;

    // Update the return date and fine amount in issued_books
    await pool.query(
      `UPDATE issued_books
       SET return_date = CURDATE(),
           fine_amount = ?
       WHERE id = ?`,
      [fineAmount, id]
    );

    // Increment the book's remaining quantity and update availability if applicable
    await pool.query(
      `UPDATE books
       SET remaining_quantity = remaining_quantity + 1,
           is_available = IF(remaining_quantity + 1 > 0, 1, is_available)
       WHERE id = (SELECT book_id FROM issued_books WHERE id = ?)`,
      [id]
    );

    res.status(200).json({ message: 'Book returned successfully', fineAmount });
  } catch (error) {
    console.error('Error returning book:', error);
    res.status(500).json({ error: 'Error returning book' });
  }
}


exports.getTotalIssuedBooksbyId=async (req, res) => {
  const memberId = req.params.id;
  
  try {
    const [results] = await pool.query('SELECT COUNT(*) AS count FROM issued_books WHERE user_id = ?', [memberId]);

    res.json({
      issuedBooks: results[0].count,
    });
  } catch (error) {
    console.error('Error fetching issued books', error);
    res.status(500).send('Server Error');
  }
}