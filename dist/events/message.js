"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.event = event;

var _toArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toArray"));

// it's to the "?", "!", ... before the command
var PREFIX = process.env.PREFIX;

function event(client, message) {
  var _message$toString, _message$toString$tri3, _prefixAndCommand$spl;

  // Ignore all bots
  if (message.author.bot) return null;

  var _message$toString$tri = message === null || message === void 0 ? void 0 : (_message$toString = message.toString()) === null || _message$toString === void 0 ? void 0 : (_message$toString$tri3 = _message$toString.trim()) === null || _message$toString$tri3 === void 0 ? void 0 : _message$toString$tri3.split(/ +/g),
      _message$toString$tri2 = (0, _toArray2["default"])(_message$toString$tri),
      prefixAndCommand = _message$toString$tri2[0],
      args = _message$toString$tri2.slice(1); // Ignore messages not starting with the prefix (in .env)


  if (!message.content.startsWith(PREFIX)) return null;
  var command = prefixAndCommand === null || prefixAndCommand === void 0 ? void 0 : (_prefixAndCommand$spl = prefixAndCommand.split(PREFIX)) === null || _prefixAndCommand$spl === void 0 ? void 0 : _prefixAndCommand$spl[1]; // Grab the command data from the client.commands Enmap

  var cmd = client.commands.get(command); // If that command doesn't exist, silently exit and do nothing

  if (!cmd) {
    return null;
  } // Run the command


  cmd.run(client, message, args);
}