const db = require('../config/db');

const GenreModel = {
  createGenre: async (name) => {
    const [result] = await db.execute('INSERT INTO Genres (name) VALUES (?)', [name]);
    return result.insertId;
  },

  getAllGenres :async () => {
    const [rows] = await db.execute('SELECT * FROM genres'); // Adjust query as needed
    return rows;
  },

  getGenreById: async (id) => {
    const [rows] = await db.execute('SELECT * FROM Genres WHERE id = ?', [id]);
    return rows[0];
  },

  updateGenreById: async (id, name) => {
    await db.execute('UPDATE Genres SET name = ? WHERE id = ?', [name, id]);
  },

  deleteGenreById: async (genreId) => {
    const [books] = await db.query('SELECT * FROM books WHERE genre_id = ?', [genreId]);
  
    if (books.length > 0) {
      return { success: false, message: 'Cannot delete this genre as it is associated with existing books.' };
    }
  
    const [result] = await db.query('DELETE FROM genres WHERE id = ?', [genreId]);
    return { success: true, message: 'Genre deleted successfully.' };
  }
    
  
};

module.exports = GenreModel;
