Jamaican Tree-Bot
==========
afrosdwilsh's IRC manifestation -- IRC bot for watching trees for Mozilla, Jamaican Redux

Setup
==========
Requires nodejs. Use npm to install dependencies:
```
npm install irc shorturl pulse translate now express
```

Configure post.py to have the correct URL.
Configure index.html in the interface to reflect the correct server and port for the NowJS Library.

Usage
==========
The IRC bot is in the tree-bot directory.

To test / emulate single-channel,
```node console.js```

To start the actual bot,
```node bot.js```

Configurations can be found in sessions.json. Settings are automatically saved.

You can invite the bot into a channel with
```/invite jamaican-treebot```
when you're in a particular channel.

The bot will say things out loud on the interface if you use the "say" command.
```say firefox dev team needs to get on it!```


Available Commands
==========
```watch <tree>``` starts watching a tree

```unwatch <tree>``` stops watching a tree

```watch <changset> on <tree> (for <person>)```

```unwatch <changset> on <tree> (for <person>)```

```<email> is <name>``` and ```I am <email>``` set name associations

```list``` or ```currently``` shows all current user-specific watches

```help``` displays help file

```say``` will say things out loud to all who are listening on the web interface.

