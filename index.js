// Get some environment going
require('dotenv').config();

const twitch = require('twitch-js');

console.log('=== Creating client ===');
const client = new twitch.client({
  identity: {
    username: process.env.TWITCH_USER,
    password: 'oauth:' + process.env.OAUTH_TOKEN
  },
  channels: [
    '#brianarn',
    '#pizza_suplex',
    '#polygon'
  ]
});

// Set up events
console.log('=== Setting up events ===');

// Some generic events that I should probably log but, at least for now, don't
// really care about their state.
const genericEvents = [
  'connecting',
  'connected',
  'logon',
  'ping',
  'reconnect'
];
genericEvents.forEach(event => {
  client.on(event, () => {
    console.log('Client: ', event);
  });
});

// Disconnection seems worth saying a bit more about.
client.on('disconnected', (reason) => {
  console.log('=== Client disconnected ===');
  console.log('Reason: ', reason);
  process.exit();
});

// Watch for chats and whispers
client.on('chat', (channel, userstate, message, self) => {
  if (self) {
    console.log('Self-chat, ignoring');
    return;
  }

  console.log('== Chat ==');
  console.log('- Channel: ', channel);
  console.log('- From: ', userstate['display-name']);
  console.log('- Message: ', message);
  console.log('== End Chat ==');
});
client.on('whisper', (from, userstate, message, self) => {
  if (self) {
    console.log('Self-whisper?!?');
    return;
  }

  console.log('== Whisper ==');
  console.log('- From: ', from);
  console.log('- Message: ', message);
  console.log('Userstate:');
  console.log(userstate);
  console.log('== End Whisper ==');
});

// Start it up!
console.log('=== Starting connection ===');
client.connect();
