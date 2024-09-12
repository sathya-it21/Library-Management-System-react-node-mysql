const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

// Route for user registration
router.post('/register', AuthController.registerUser);

// Route for user login
router.post('/login', AuthController.loginUser);

router.post('/refresh-token', AuthController.refreshToken); // Add this route

module.exports = router;
