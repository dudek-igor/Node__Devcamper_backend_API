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
// require models
const Bootcamp = require('../models/Bootcamp');

// Include other ressource routers
const courseRouter = require('./courses');

const router = express.Router();

// Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);

// Added Methods to route
router
  .route('/')
  .get(advanceResults(Bootcamp, 'courses'), getBootcamps)
  .post(createBootcamp);

router
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

// get Bootcamp by zipcode in specific area
router.route('/radius/:zipcode/:distance').get(getBootcampInRadius);

// upload a file/photo
router.route('/:id/photo').put(uploadBootcampPhoto);

module.exports = router;
