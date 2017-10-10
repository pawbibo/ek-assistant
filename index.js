const RtmClient = require('@slack/client').RtmClient;
const CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
const RTM_EVENTS = require('@slack/client').RTM_EVENTS;

const ek = require('./controllers/ekController');
const hr = require('./controllers/hrController');

require('dotenv').config({ path: 'variables.env' });

const rtm = new RtmClient(process.env.BOT_TOKEN);

rtm.start();

let channel;
let bot;

// The client will emit an RTM.AUTHENTICATED event on successful connection, with the `rtm.start` payload
rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (rtmStartData) => {
  for (const c of rtmStartData.channels) {
    if (c.is_member && c.name ==='bibo-cake') { channel = c.id }
  }
  console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);

  bot = `<@${rtmStartData.self.id}>`;
});

// you need to wait for the client to fully connect before you can send messages
rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function () {
  //rtm.sendMessage("Hello!", channel);
});

rtm.on(RTM_EVENTS.MESSAGE, function(message) {
  if (message.channel !== channel) {
    return;
  }

  if (message.text === null) {
    return;
  }

  var pieces = message.text.split(' ');

  if (pieces.length > 1) {
    if (pieces[0] === bot) {
      var response = '<@' + message.user + '>';

      switch (pieces[1].toLowerCase()) {
        case "payroll-announce":
          hr.announcePayrollCutOff(pieces[2], pieces[3]).then(data => {
            response += data;
            sendMessage(response, message.channel);
          });
          break;
        case "diff":
          ek.fileDifference('front').then(data => {
            response += data;
            sendMessage(response, message.channel);
          });
          break;
        default:
          response += ', sorry I do not understand the command "' + pieces[1] + '". For a list of supported commands, type: ' + bot + ' help';
          break;
      }
    }
  }
});

const sendMessage = (message, channel) => {
  rtm.sendMessage(message, channel);
};
