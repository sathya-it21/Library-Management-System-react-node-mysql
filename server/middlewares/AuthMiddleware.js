const jwt = require('jsonwebtoken');
const pool = require('../config/db'); // Update with your actual path to db connection

const authorize = (roles = []) => {
  // roles is an array of allowed roles
  return async (req, res, next) => {
    try {
      // Get token from Authorization header
      const authHeader = req.headers['authorization'];
      if (!authHeader) {
        return res.status(401).json({ message: 'No token provided' });
      }

      const token = authHeader.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'No token provided' });
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded) {
        return res.status(401).json({ message: 'Invalid token' });
      }

      // Fetch user from database
      const [rows] = await pool.query('SELECT role FROM users WHERE id = ?', [decoded.id]);
      if (rows.length === 0) {
        return res.status(401).json({ message: 'User not found' });
      }

      const userRole = rows[0].role;

      // Check if the user's role is allowed
      if (roles.length && !roles.includes(userRole)) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      // Attach user to request object
      req.user = { id: decoded.id, role: userRole };

      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired' });
      }
      console.error('Authorization error:', error);
      res.status(401).json({ message: 'Unauthorized' });
    }
  };
};

module.exports = authorize;
