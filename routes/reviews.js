const express = require('express');
const Review = require('../models/Review');
const {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviews');

const router = express.Router({ mergeParams: true });

// Middleware
const advanceResult = require('../middlewares/advanceResults');
const { authroize, protect } = require('../middlewares/auth');

router
  .route('/')
  .get(
    advanceResult(Review, { path: 'bootcamp', select: 'name description' }),
    getReviews
  )
  .post(protect, authroize('user', 'admin'), createReview);

router
  .route('/:id')
  .get(getReview)
  .put(protect, authroize('user', 'admin'), updateReview)
  .delete(protect, authroize('user', 'admin'), deleteReview);

module.exports = router;
