const db = require('../config/db');

const AuthorModel = {
  createAuthor: async (name,bio) => {
    const [result] = await db.execute('INSERT INTO Authors (name,biography) VALUES (?,?)', [name,bio]);
    return result.insertId;
  },

  // Function to get all authors
getAllAuthors :async () => {
  const [rows] = await db.execute('SELECT * FROM authors'); // Adjust query as needed
  return rows;
},

  getAuthorById: async (id) => {
    const [rows] = await db.execute('SELECT * FROM Authors WHERE id = ?', [id]);
    return rows[0];
  },

  updateAuthorById: async (id, name,biography) => {
    await db.execute('UPDATE Authors SET name = ?, biography= ? WHERE id = ?', [name,biography, id]);
  },

  deleteAuthorById: async (authorId) => {
    const [books] = await db.query('SELECT * FROM books WHERE author_id = ?', [authorId]);
  
    if (books.length > 0) {
      return { success: false, message: 'Cannot delete this author as they are associated with existing books.' };
    }
  
    const [result] = await db.query('DELETE FROM authors WHERE id = ?', [authorId]);
    return { success: true, message: 'Author deleted successfully.' };
  }
};

module.exports = AuthorModel;
