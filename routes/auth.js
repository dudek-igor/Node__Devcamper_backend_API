const express = require('express');
const { registerUser, loginUser, getMe } = require('../controllers/auth');

// Middleware
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/me').get(protect, getMe);

module.exports = router;
