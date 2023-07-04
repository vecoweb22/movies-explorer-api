const rateLimit = require('express-rate-limit');

module.exports.limiter = rateLimit({
  windowsMs: 10 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
