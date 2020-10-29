const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const errorHandler = require('./middlewares/errorHandler');
const colors = require('colors');
const connectDB = require('./config/db');

// Load env vars from config
dotenv.config({ path: './config/config.env' });

// Route files
const bootcamps = require('./routes/bootcamps');

//Connect with Database
connectDB();
// Initial server
const app = express();

// Middleware before routes
// Body-Praser
app.use(express.json());
// Morgan only in dev env
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);

// Middleware after routes
app.use(errorHandler);

//Added Listening
const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(
    `Server listening on ${PORT}, mode ${process.env.NODE_ENV}`.yellow.bold
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red.bold);
  // Close server and exit process
  server.close(() => process.exit(1));
});
