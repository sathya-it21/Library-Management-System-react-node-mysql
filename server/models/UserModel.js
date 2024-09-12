const db = require('../config/db');

const UserModel = {
  createUser: async (name, email, password, role) => {
    const [result] = await db.execute(
      'INSERT INTO Users (name, email, password, role, is_active) VALUES (?, ?, ?, ?, ?)',
      [name, email, password, role, 1] // 1 indicates active
    );
    return result.insertId;
  },


  getAllUsers: async()=>{
    const [rows]= await db.execute('SELECT * FROM users');
    return rows;
  },


  getUserByEmail: async (email) => {
    const [rows] = await db.execute('SELECT * FROM Users WHERE email = ?', [email]);
    return rows[0];
  },

  getUserById: async (id) => {
    const [rows] = await db.execute('SELECT * FROM Users WHERE id = ?', [id]);
    return rows[0];
  },

  updateUserById: async (id, name, email, password, role) => {
    await db.execute(
      'UPDATE Users SET name = ?, email = ?, password = ?, role = ? WHERE id = ?',
      [name, email, password, role, id]
    );
  },

  deleteUserById: async (id) => {
    await db.execute('DELETE FROM Users WHERE id = ?', [id]);
  },

  updateUserStatus: async (id, is_active) => {
    try {
      const [result] = await db.execute(
        'UPDATE users SET is_active = ? WHERE id = ?',
        [is_active ? 1 : 0, id]
      );
  
      return result;
    } catch (error) {
      console.error('Error executing updateUserStatus:', error); // Add more detailed error logging here
      throw error;
    }
  },

  getIssuedBooksByUserId: async (userId) => {
    const [rows] = await db.execute(`
      SELECT ib.id, b.title, b.isbn, au.name AS author, ib.approval_date, ib.return_date, ib.fine_amount
      FROM issued_books ib
      JOIN books b ON ib.book_id = b.id
      JOIN authors au ON b.author_id = au.id
      WHERE ib.user_id = ?
      ORDER BY ib.approval_date DESC
    `, [userId]);
    return rows;
  },

  getBookRequestsByUserId: async (userId) => {
    const [rows] = await db.execute(`
      SELECT br.id, b.title, b.isbn, br.request_date, br.status
      FROM book_requests br
      JOIN books b ON br.book_id = b.id
      WHERE br.user_id = ?
      ORDER BY br.request_date DESC
    `, [userId]);
    return rows;
  }
  
};

module.exports = UserModel;
