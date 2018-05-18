// Get some modules
const log = require('./log');
const twitch = require('twitch-js');

// Get our channel list
const channels = require('../channelList.json');

const config = {
  options: {
    debug: process.env.TWITCH_CLIENT_DEBUG === 'true'
  },
  identity: {
    username: process.env.TWITCH_USER,
    password: 'oauth:' + process.env.OAUTH_TOKEN
  },
  channels
};

log.info('=== Creating client ===');
const client = new twitch.client(config);

// Set up events
log.info('=== Setting up events ===');

// Some generic events that I should probably log but, at least for now, don't
// really care about their state.
const genericEvents = ['connecting', 'logon', 'ping', 'pong', 'reconnect'];
genericEvents.forEach(event => {
  client.on(event, () => {
    log.debug('Event:', event);
  });
});

client.on('connected', () => {
  log.info('=== Client connected ===');
});

// Disconnection seems worth saying a bit more about.
client.on('disconnected', reason => {
  log.info('=== Client disconnected ===');
  log.debug('Reason: ', reason);
});

// Watch channel join/parts
client.on('join', (channel, username, self) => {
  // For now, we only care about ourselves
  if (self) {
    log.info('--- bot joined', channel);
    return;
  }
});
client.on('part', (channel, username, self) => {
  // For now, we only care about ourselves
  if (self) {
    log.info('bot left', channel);
    return;
  }
});

// Watch for chats and whispers
client.on('message', (channel, userstate, message, self) => {
  if (self) {
    log.debug('Self-chat, ignoring');
    return;
  }

  log.debug('== Message ==');
  log.debug('- Channel: ', channel);
  log.debug('- From: ', userstate['display-name']);
  log.debug('- Type: ', userstate['message-type']);
  log.debug('- Message: ', message);
  log.debug('== End Chat ==');
});

// Export it
module.exports = client;
