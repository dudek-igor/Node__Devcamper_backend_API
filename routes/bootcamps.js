const express = require('express');
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampInRadius,
  uploadBootcampPhoto,
} = require('../controllers/bootcamps');
// require middlewares
const advanceResults = require('../middlewares/advanceResults');
const { protect, authroize } = require('../middlewares/auth');
// require models
const Bootcamp = require('../models/Bootcamp');

// Include other ressource routers
const courseRouter = require('./courses');
const reviewsRouter = require('./reviews');

const router = express.Router();

// Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);
router.use('/:bootcampId/reviews', reviewsRouter);

// Added Methods to route
router
  .route('/')
  .get(advanceResults(Bootcamp, 'courses'), getBootcamps)
  .post(protect, authroize('admin', 'publisher'), createBootcamp);

router
  .route('/:id')
  .get(getBootcamp)
  .put(protect, authroize('admin', 'publisher'), updateBootcamp)
  .delete(protect, authroize('admin', 'publisher'), deleteBootcamp);

// get Bootcamp by zipcode in specific area
router.route('/radius/:zipcode/:distance').get(getBootcampInRadius);

// upload a file/photo
router
  .route('/:id/photo')
  .put(protect, authroize('admin', 'publisher'), uploadBootcampPhoto);

module.exports = router;
