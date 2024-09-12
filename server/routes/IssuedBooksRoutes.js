const express = require('express');
const router = express.Router();
const issuedBookController = require('../controllers/IssuedBooksController');

router.get('/',issuedBookController.getAllIssuedBooks);
router.get('/total/:id',issuedBookController.getTotalIssuedBooksbyId);
router.get('/:id',issuedBookController.getIssuedBookbyId);
router.patch('/return/:id',issuedBookController.returnbook);
module.exports = router;
