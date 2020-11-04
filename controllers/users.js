const User = require('../models/User');
const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../utils/errorResponse');

// Methods
// @desc Get All Users
// @route GET /api/v1/users
// @access Private only admin
exports.getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advanceResults);
});

// @desc Get Single User
// route GET /api/v1/users/:id
// @access Private only admin
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
  }

  res.status(200).json({ success: true, data: user });
});

// @desc Create user
// @route POST /api/v1/users
// @access Private only admin
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  if (!user) {
  }

  res.status(201).json({ success: true, data: user });
});
// @desc Update user
// @route PUT /api/v1/users/:id
// @access Private only admin
exports.updateUser = asyncHandler(async (req, res, next) => {
  // Protect user password from changes by admin
  if ('password' in req.body) {
    return next(
      new ErrorResponse('Admins are not allowed to change user passwords', 403)
    );
  }
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
  }

  res.status(201).json({ success: true, data: user });
});

// @desc Delete user
// @route DELETE /api/v1/users/:id
// @access Private only admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true, data: {} });
});
