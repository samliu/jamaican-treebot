//BEGIN PRANK
var http = require('http'),
    path = require('path'),
    fs = require('fs'),
    url = require('url'),
    express = require('express'),
    nowjs = require('now');

var app = express.createServer();

app.use(express.bodyParser());

app.get('/', function(req, res){
    console.log("root");
    });

app.post('/parse', function(req, res){
    var data = req.body.data;
    var url = req.body.url;
    console.log("==========");
    console.log(data);
    console.log(url);
    console.log("==========");
    res.writeHead(200);
    res.end();
    dist_data(data,url);
    });

app.listen(9876);
console.log("Express server started!");

var everyone = nowjs.initialize(app);

dist_data = function(data,url){
  try{
    everyone.now.speak(data);
    everyone.now.show_image(url);
  }catch(TypeError){
    console.log("No clients listening to web page...");
  
  }
}

//END SAM STUFF


var irc = require("irc");
var channels = require("./channels");
var updater = require("./updater");

var session = require("./sessionrestore");

// Connect to IRC
var kNick = 'jamaican-treebot';
var kAuthorizedUsers = [
'sdwilsh', 'robarnold', 'samliu'
];

function isAuthorizedUser(user) {
  return kAuthorizedUsers.indexOf(user) !== -1;
}

var client = new irc.Client("irc.mozilla.org", kNick, {
userName: kNick,
realName: "Drug Rug Permasheriff",
channels: [],
secure: true,
port: 6697
});

updater.restart = function () {
  client.disconnect("Updating...");
  require("child_process").spawn('node', [__filename], { customFds: [0, 1, 2] });
  process.exit();
};

function makeBackend(channel)
{
  return {
say: client.say.bind(client, channel),
       pm: client.say.bind(client),
       isAuthorizedUser: isAuthorizedUser,
       channelStateChanged: session.updateChannelState.bind(session, channel),
  };
}

function joinChannel(name, cb) {
  // Only try to join things that look like irc channels
  // i.e. not the special console channel
  if (/^#/.test(name)) {
    client.join(name, function () {
        cb(makeBackend(name));
        });
  }
}

client.on("registered", session.restore.bind(session, joinChannel));

client.on("invite", function (channel, from) {
    if (isAuthorizedUser(from)) {
    // TODO: solve race condition here
    joinChannel(channel, function (backend) {
      session.onNewChannel(channel);
      channels.add(channel, backend);
      });
    }
    });

client.addListener("error", function(m) {
    console.error(m);
    });

client.addListener("message", function(from, to, message) {
    var channel = channels.get(to);

    if (channel === undefined)
    return;

    var match = /(.+): (.*)/.exec(message);
    if (match) {
    target = match[1];
    text = match[2];

    if (target === kNick) {
    channel.handleCommand(from, text);
    }
    }
    });
