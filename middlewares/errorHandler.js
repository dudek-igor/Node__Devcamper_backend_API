const ErrorResponse = require('../utils/errorResponse');
const slugify = require('slugify');

// @desc Custom Error Middleware
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  // Log to console for dev
  console.log(err);
  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }
  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = `Duplicate field value enterned`;
    error = new ErrorResponse(message, 400);
  }
  // Mongooese validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  // Defeult Error
  res.status(error.statusCode || 500).json({
    success: false,
    error: err.message || 'Server Error',
  });
  next();
};

module.exports = errorHandler;
