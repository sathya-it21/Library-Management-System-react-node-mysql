const db = require('../config/db');

exports.getMetrics = async (req, res) => {
  try {
    const [totalBooksResult] = await db.query('SELECT COUNT(*) AS count FROM books');
    const [totalAuthorsResult] = await db.query('SELECT COUNT(*) AS count FROM authors');
    const [totalGenresResult] = await db.query('SELECT COUNT(*) AS count FROM genres');
    const [issuedBooksResult] = await db.query('SELECT COUNT(*) AS count FROM issued_books');
    const [pendingRequestsResult] = await db.query('SELECT COUNT(*) AS count FROM book_requests WHERE status = "pending"');

    res.json({
      totalBooks: totalBooksResult[0].count,
      totalAuthors: totalAuthorsResult[0].count,
      totalGenres: totalGenresResult[0].count,
      issuedBooks: issuedBooksResult[0].count,
      pendingRequests: pendingRequestsResult[0].count,
    });
  } catch (error) {
    console.error('Error fetching metrics', error);
    res.status(500).send('Server Error');
  }
};
