// Load the baseline logger
const log = require('loglevel');

// Configure the logger
if (process.env.LOGLEVEL) {
  log.setLevel(process.env.LOGLEVEL);
}

// Export it out
module.exports = log;
