const express = require('express');
const router = express.Router();
const BookController = require('../controllers/BookController');
const authorize = require('../middlewares/AuthMiddleware');


// Route definitions
router.post('/', authorize(['Admin']), BookController.createBook);
router.get('/', authorize(['Admin', 'Member']), BookController.getAllBooks);
router.get('/getAll',authorize(['Admin', 'Member']), BookController.getAllBooksWithvalue)

router.get('/:id', authorize(['Admin', 'Member']), BookController.getBookById);
router.get('/isbn/:isbn', authorize(['Admin', 'Member']), BookController.getBookByIsbn);
router.put('/:id', authorize(['Admin']), BookController.updateBookById);
router.delete('/:id', authorize(['Admin']), BookController.deleteBookById);

module.exports = router;
