var url = require("url");
var shorturl = require("shorturl");
var randompicker = require('./randompicker');
var committers = require('./committers');
var committers = require('./');

var kUrlService = 'goo.gl';

//var greetings = [
//  { chance: 0.1, text: "o hai" },
//  { chance: 0.1, text: "The permasheriff is, uh...back" },
//  { chance: 0.1, text: "Greetings!" },
//  { chance: 0.1, text: "Never fear, the permasheriff has arrived" },
//  { chance: 0.1, text: "Today feels like a good day to sheriff" },
//  { chance: 0.1, text: "There better not be any red on my watch" },
//  { chance: 0.1, text: "Don't mess with the fro" },
//  { chance: 0.1, text: "Green is my favorite colour.  Let's keep the tree that way today." },
//  { chance: 0.1, text: "I dislike orange and red.  Let's make sure I don't see any of that today" },
//  { chance: 0.1, text: "I've got $10 on an intermittent orange being fixed today.  I'll share some of that to whoever fixes one first!" },
//];

//Jamaican-ize the greetings
var greetings = [
  { chance: 0.1, text: "Just got back from beating some steel drums." },
  { chance: 0.1, text: "My drug rug was just set out to dry. Give it some time." },
  { chance: 0.1, text: "Cool runnings." },
  { chance: 0.1, text: "I think I'm going to name my son Natty." },
  { chance: 0.1, text: "Dese burning trees jamaican me crazy." },
  { chance: 0.1, text: "Galang bout yuh business." },
  { chance: 0.1, text: "A wan irie likkle tree." },
  { chance: 0.1, text: "Tan deh tink sey im a guh 'elp yu." },
];

exports.greet = function greet(cb)
{
  var text = randompicker(greetings, 'text');
  cb(text);
}

var successes = [
  { chance: 0.0003, text: "Another successful build. Good job, team!" },
  { chance: 0.0001, text: "Code compiled and passed tests...we're not totally hosed!" },
  { chance: 0.9996, text: "" }
];

exports.success = function success(cb, event)
{
  if (event.ignored)
    return;
  var text = randompicker(successes, 'text');
  cb(text);
}

exports.warning = function warning(cb, event)
{
  if (event.ignored)
    return;
  shorturl(event.logfile, kUrlService, function (logfile) {
    committers.lookup(event.pusher, function (name) {
      cb("{0}: I see test failures in {1} on {2} with your push of {3} to {4}. Details: {5}", name, event.type, event.platform, event.rev, event.tree, logfile);
    }, function (name) {
      if (name === undefined) {
        cb("Who the hell is {0} and why did they make {1} turn orange on {3} with {4}? {2}", event.pusher, event.tree, logfile, event.platform, event.rev);
      } else {
        cb("Who the hell is {0} ({2}?) and why did they make {1} turn orange on {4} with {5}? {3}", event.pusher, event.tree, name, logfile, event.platform, event.rev);
      }
    });
  });
}

exports.failure = function failure(cb, event)
{
  if (event.ignored)
    return;
  shorturl(event.logfile, kUrlService, function (logfile) {
    committers.lookup(event.pusher, function (name) {
      cb("{0}: Did you try compiling before pushing to {3}? There's a build failure on {1}, see {2} for details", name, event.platform, logfile, event.tree);
    }, function (name) {
      if (name === undefined) {
        cb("Who the hell is {0} and why did they break {1}? See {2} for details.", event.pusher, event.tree, logfile);
      } else {
        cb("Who the hell is {0} ({2}?) and why did they break {1}? See {3} for details", event.pusher, event.tree, name, logfile);
      }
    });
  });
}
