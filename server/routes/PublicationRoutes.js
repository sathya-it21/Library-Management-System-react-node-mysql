const express = require('express');
const router = express.Router();
const PublicationController = require('../controllers/PublicationController');
const authorize = require('../middlewares/AuthMiddleware');


router.post('/publications', authorize(['Admin']),PublicationController.createPublication);
router.get('/publications', authorize(['Admin', 'Member']),PublicationController.getAllPublications);
router.get('/publications/:id', authorize(['Admin', 'Member']),PublicationController.getPublicationById);
router.put('/publications/:id', authorize(['Admin']),PublicationController.updatePublicationById);
router.delete('/publications/:id', authorize(['Admin']),PublicationController.deletePublicationById);

module.exports = router;
