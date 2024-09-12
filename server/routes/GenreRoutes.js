const express = require('express');
const router = express.Router();
const GenreController = require('../controllers/GenreController');
const authorize = require('../middlewares/AuthMiddleware');


router.post('/genres',authorize(['Admin']), GenreController.createGenre);
router.get('/genres', authorize(['Admin', 'Member']),GenreController.getAllGenres);
router.get('/genres/:id', authorize(['Admin', 'Member']),GenreController.getGenreById);
router.put('/genres/:id', authorize(['Admin']),GenreController.updateGenreById);
router.delete('/genres/:id', authorize(['Admin']),GenreController.deleteGenreById);

module.exports = router;
