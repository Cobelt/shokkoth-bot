"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _discord = _interopRequireDefault(require("discord.js"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _enmap = _interopRequireDefault(require("enmap"));

var _fs = _interopRequireDefault(require("fs"));

_dotenv["default"].config();

var client = new _discord["default"].Client();
client.on('ready', function () {
  var _client$user;

  console.log("Logged in as ".concat(client === null || client === void 0 ? void 0 : (_client$user = client.user) === null || _client$user === void 0 ? void 0 : _client$user.tag, "!"));
});

_fs["default"].readdir(__dirname + '/events/', function (err, files) {
  if (err) return console.error(err);
  files.forEach(function (file) {
    var _require = require("".concat(__dirname, "/events/").concat(file)),
        event = _require.event;

    var eventName = file.split('.')[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Map();

_fs["default"].readdir(__dirname + '/commands/', function (err, files) {
  if (err) return console.error(err);
  files.forEach(function (file) {
    if (!file.endsWith('.js')) return;

    var props = require("".concat(__dirname, "/commands/").concat(file));

    var commandName = file.split('.')[0];
    client.commands.set(commandName, props);
  });
}); // client.on('message', message => {
//     // console.log({ message })
//     const [commandWithKey, ...props] = message?.toString()?.trim()?.split(/ +/g)
//     const command = commandWithKey?.split(PREFIX)?.[1]
//     // Ignore if
//     // • doesn't start with prefix
//     // • there is no command
//     // • it's a bot's message
//     if (
//         !message.content.startsWith(PREFIX) ||
//         [null, undefined, ''].includes(command) ||
//         message.author.bot
//     ) {
//         return false
//     }
//     console.log({ channelType: message.channel.type })
// const isOwner = message.author.id === process.env.OWNER_ID
// const isAdmin = message?.member?.permissions?.has('ADMINISTRATOR')
// switch (command.toLowerCase()) {
//     case 'imp':
//     case 'import': {
//         message.reply('Actuellement sur la TODO list, déso ! :(')
//         break
//     }
//     case 's':
//     case 'stuff': {
//         message.reply('Actuellement sur la TODO list, déso ! :(')
//         break
//     }
//     case 'e':
//     case 'equip':
//     case 'equipment': {
//         message.reply('Actuellement sur la TODO list, déso ! :(')
//         break
//     }
//     case 'log':
//     case 'login': {
//         const { id } = message.author
//         message.reply(`Actuellement sur la TODO list, déso ! :(`)
//         break
//     }
//     default: {
//         message.reply('Commande inconnue :(')
//     }
// }
// })


client.login(process.env.API_KEY);