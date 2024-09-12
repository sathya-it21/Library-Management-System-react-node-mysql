const db = require('../config/db');

const BookModel = {
  createBook : async (title, author_id, publication_id, genre_id, is_available, remaining_quantity,isbn, quantity) => {
    const sql = `
      INSERT INTO books (title, author_id, publication_id, genre_id, is_available, remaining_quantity,isbn, quantity, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?,?, ?, NOW(), NOW())
    `;
    
    // Execute the query with the provided values
    return db.execute(sql, [title, author_id, publication_id, genre_id, is_available,remaining_quantity, isbn, quantity]);
  },

  getAllBooks: async()=>{
    const [rows]= await db.execute('SELECT * FROM Books');
    return rows;
  },

  getAllBooksWithvalue: async()=>{
    let query = `
    SELECT b.*, a.name AS author, g.name AS genre, p.name AS publication
    FROM books b
    LEFT JOIN authors a ON b.author_id = a.id
    LEFT JOIN genres g ON b.genre_id = g.id
    LEFT JOIN publications p ON b.publication_id = p.id
    WHERE 1=1
  `;
      const [rows]=await db.execute(query);
      return rows;
  },

  

  getBookById: async (id) => {
    const [rows] = await db.execute('SELECT * FROM Books WHERE id = ?', [id]);
    return rows[0];
  },

  getBookByIsbn: async (isbn) => {
    const [rows] = await db.execute('SELECT * FROM Books WHERE isbn = ?', [isbn]);
    return rows[0];
  },

  updateBookById: async (id, title, author_id, publication_id, genre_id, isbn, quantity, is_available) => {
    await db.execute(
      'UPDATE Books SET title = ?, author_id = ?, publication_id = ?, genre_id = ?, isbn = ?, quantity = ?, is_available = ? WHERE id = ?',
      [title, author_id, publication_id, genre_id, isbn, quantity, is_available, id]
    );
  },

  deleteBookById: async (id) => {
    await db.execute('DELETE FROM Books WHERE id = ?', [id]);
  },



 
  
  
};

module.exports = BookModel;
