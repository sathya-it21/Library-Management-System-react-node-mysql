const express = require('express');
const router = express.Router();
const BookRequestController = require('../controllers/BookRequestController');

// Route to request a book
router.post('/', BookRequestController.requestBook);

router.get('/', BookRequestController.getAllRequests);

// Route to get all requests for a user
router.get('/:userId', BookRequestController.getUserRequests);

// Route to update request status
// router.patch('/status', BookRequestController.updateRequestStatus);

router.patch('/approve',BookRequestController.approveRequests);
router.patch('/reject',BookRequestController.rejectRequest);

module.exports = router;
