// @desc Logs request to console
// morgan replace this middleware
const logger = (req, res, next) => {
  req.hello = 'Hello World';
  console.log(
    `${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`
  );
  next();
};

module.exports = logger;
