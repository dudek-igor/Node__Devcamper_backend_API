const express = require('express');
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/users');

// require middlewares
const advanceResults = require('../middlewares/advanceResults');
const { protect, authroize } = require('../middlewares/auth');
// require models
const User = require('../models/User');

const router = express.Router();
router.use(protect);
router.use(authroize('admin'));

router.route('/').get(advanceResults(User), getUsers).post(createUser);
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
