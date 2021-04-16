"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = run;

var _dayjs = _interopRequireDefault(require("dayjs"));

function run(client, message, args) {
  var isOwner = message.author.id === process.env.OWNER_ID;

  if (isOwner) {
    var _message$channel, _message$author, _message$author2;

    var time = (0, _dayjs["default"])().format('[[]HH:mm]');
    message === null || message === void 0 ? void 0 : (_message$channel = message.channel) === null || _message$channel === void 0 ? void 0 : _message$channel.send("\n            ".concat(time, " (Combat) **").concat(message === null || message === void 0 ? void 0 : (_message$author = message.author) === null || _message$author === void 0 ? void 0 : _message$author.username, "** lance **Doom**.\n\n            ").concat(time, " (Combat) **").concat(message === null || message === void 0 ? void 0 : (_message$author2 = message.author) === null || _message$author2 === void 0 ? void 0 : _message$author2.username, "** tue **Shokkoth** !\n\n            ").concat(time, " (Combat) **Shokkoth** est mort !\n\n            ").concat(time, " (Combat) Combat termin\xE9.\n        ")); // client.destroy()
  }
}