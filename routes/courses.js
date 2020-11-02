const express = require('express');
const {
  getCourses,
  getSingleCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/courses');
// require middlewares
const advanceResults = require('../middlewares/advanceResults');
const { protect, authroize } = require('../middlewares/auth');
// require models
const Course = require('../models/Course');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(
    advanceResults(Course, {
      path: 'bootcamp',
      select: 'name description',
    }),
    getCourses
  )
  .post(protect, authroize('admin', 'publisher'), createCourse);
router
  .route('/:id')
  .get(getSingleCourse)
  .put(protect, authroize('admin', 'publisher'), updateCourse)
  .delete(protect, authroize('admin', 'publisher'), deleteCourse);

module.exports = router;
