const express = require('express');
const dotenv = require('dotenv');

// Route files
const bootcamps = require('./routes/bootcamps');

// Load env vars from config
dotenv.config({ path: './config/config.env' });
// Initial server
const app = express();

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);

//Added Listening
const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server listening on ${PORT}, mode ${process.env.NODE_ENV}`)
);
