const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController.js');
const authorize = require('../middlewares/AuthMiddleware');


router.get('/search',searchController.searchBook);
module.exports = router;
