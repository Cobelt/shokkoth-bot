"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = run;

var _discord = require("discord.js");

function run(client, message, args) {
  var _message$channel2, _message$channel2$per;

  if (message.channel.type === _discord.DMChannel) {
    var _message$channel;

    var quantity = parseInt(args === null || args === void 0 ? void 0 : args[0], 10) || 1;
    message === null || message === void 0 ? void 0 : (_message$channel = message.channel) === null || _message$channel === void 0 ? void 0 : _message$channel.bulkDelete(quantity);
  } else if (message !== null && message !== void 0 && (_message$channel2 = message.channel) !== null && _message$channel2 !== void 0 && (_message$channel2$per = _message$channel2.permissionsFor(message === null || message === void 0 ? void 0 : message.member)) !== null && _message$channel2$per !== void 0 && _message$channel2$per.has('MANAGE_MESSAGES')) {
    var _message$channel3;

    var _quantity = parseInt(args === null || args === void 0 ? void 0 : args[0], 10) || 1;

    message === null || message === void 0 ? void 0 : (_message$channel3 = message.channel) === null || _message$channel3 === void 0 ? void 0 : _message$channel3.bulkDelete(_quantity + 1); // +1 to delete the command + X messages
  }
}