# polypalbot

A Node.js-based Twitch chat bot to provide interesting data about some fun Polygon streams

## Plans

Early plans are to monitor some Polygon channels to determine the frequency of
times people say Boys, or Boys Per Minute (BPM).

Additionally, I'd like to get this thing wrapped in Docker at some point, but
for now this is fine for local playing around.

## Setup

### Get a Twitch account

Based on the [Twitch chatbots docs](https://dev.twitch.tv/docs/irc/), you'll
need a Twitch account, and you'll need to get an oauth token in order to connect
it to IRC.

A `polypalbot` account has been created for this purpose, but if you wish to
develop / test / whatever with this code, you'll need to use your own account,
either your personal one or one created for bot purposes.

### Get an oauth token

The above documentation has detail about generating an oauth token, but it also
links to the rather convenient [Twitch Chat OAuth Password
Generator](https://twitchapps.com/tmi/). Do keep in mind that means
authenticating your account against an application that is _not_ owned or
maintained by Twitch. Given that they advise people to use it, it is likely
trustworthy.

### Create a `.env` file

There is a `.env.example` file. Copy it to `.env` and set the `TWITCH_USER` and
`OAUTH_TOKEN` values as appropriate.

**Note:** Do _not_ include the leading `oauth:` part in your token. It should
be a 30-character alphanumeric string.

```
TWITCH_USER=<your username>
OAUTH_TOKEN=<your token>
```

### Install dependencies

Assuming you've already got Node 8.x+ install, run `npm install` to get your
dependencies in place.

### Run the thing!

Fire it up with `npm start` and you're on your way!
