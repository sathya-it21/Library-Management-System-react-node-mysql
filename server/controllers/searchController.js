const pool = require('../config/db'); // Ensure this path is correct

exports.searchBook = async (req, res) => {
  const { title, authorName, genreName, isbn, page = 1, limit = 10 } = req.query;

  // Construct the SQL query dynamically
  let query = `
    SELECT b.*, a.name AS authorName, g.name AS genreName, p.name AS publicationName
    FROM books b
    LEFT JOIN authors a ON b.author_id = a.id
    LEFT JOIN genres g ON b.genre_id = g.id
    LEFT JOIN publications p ON b.publication_id = p.id
    WHERE 1=1
  `;
  const queryParams = [];

  if (title) {
    query += ' AND b.title LIKE ?';
    queryParams.push(`%${title}%`);
  }

  if (authorName) {
    query += ' AND a.name LIKE ?';
    queryParams.push(`%${authorName}%`);
  }

  if (genreName) {
    query += ' AND g.name LIKE ?';
    queryParams.push(`%${genreName}%`);
  }

  if (isbn) {
    query += ' AND b.isbn = ?';
    queryParams.push(isbn);
  }

  // Add pagination
  const offset = (parseInt(page) - 1) * parseInt(limit);
  query += ' LIMIT ? OFFSET ?';
  queryParams.push(parseInt(limit), offset);

  try {
    const [rows] = await pool.query(query, queryParams);

    // Get total count for pagination info
    let countQuery = `
      SELECT COUNT(*) as total
      FROM books b
      LEFT JOIN authors a ON b.author_id = a.id
      LEFT JOIN genres g ON b.genre_id = g.id
      LEFT JOIN publications p ON b.publication_id = p.id
      WHERE 1=1
    `;

    // Add conditions for count query
    const countParams = [];

    if (title) {
      countQuery += ' AND b.title LIKE ?';
      countParams.push(`%${title}%`);
    }

    if (authorName) {
      countQuery += ' AND a.name LIKE ?';
      countParams.push(`%${authorName}%`);
    }

    if (genreName) {
      countQuery += ' AND g.name LIKE ?';
      countParams.push(`%${genreName}%`);
    }

    if (isbn) {
      countQuery += ' AND b.isbn = ?';
      countParams.push(isbn);
    }

    const [[{ total }]] = await pool.query(countQuery, countParams);

    res.json({
      books: rows,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error searching for books:', error);
    res.status(500).json({ error: 'Error searching for books' });
  }
};
