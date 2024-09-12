const db = require('../config/db');

const PublicationModel = {
  createPublication: async (name) => {
    const [result] = await db.execute('INSERT INTO Publications (name) VALUES (?)', [name]);
    return result.insertId;
  },

  getAllPublications:async () => {
    const [rows] = await db.execute('SELECT * FROM publications'); // Adjust query as needed
    return rows;
  },

  getPublicationById: async (id) => {
    const [rows] = await db.execute('SELECT * FROM Publications WHERE id = ?', [id]);
    return rows[0];
  },

  updatePublicationById: async (id, name) => {
    await db.execute('UPDATE Publications SET name = ? WHERE id = ?', [name, id]);
  },

  deletePublicationById: async (publicationId) => {
    // Check if there are books associated with the publication
    const [books] = await db.query('SELECT * FROM books WHERE publication_id = ?', [publicationId]);
  
    // If books are associated, return a message
    if (books.length > 0) {
      return { success: false, message: 'Cannot delete this publication as it is associated with existing books.' };
    }
  
    // If no books, delete the publication
    const [result] = await db.query('DELETE FROM publications WHERE id = ?', [publicationId]);
    return { success: true, message: 'Publication deleted successfully.' };
  }
};

module.exports = PublicationModel;
