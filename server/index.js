// Get some environment going
require('dotenv').config();

// Load some modules
const log = require('./lib/log');
const client = require('./lib/twitch-client');

// Start it up!
log.info('=== Starting connection ===');
client.connect();
