const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/user/history/:userId',UserController.getUserHistory);
router.post('/users', UserController.createUser);
router.get('/users', UserController.getAllUsers);
router.get('/users/:email', UserController.getUserByEmail);
router.get('/users/:id', UserController.getUserById);
router.put('/users/:id', UserController.updateUserById);
router.delete('/users/:id', UserController.deleteUserById);

router.put('/users/:id/toggle', UserController.updateUserStatus);


module.exports = router;
