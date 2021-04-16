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
    var _message$channel, _message$author;

    var time = (0, _dayjs["default"])().format('[[]HH:mm]');
    message === null || message === void 0 ? void 0 : (_message$channel = message.channel) === null || _message$channel === void 0 ? void 0 : _message$channel.send("\n            ".concat(time, " (Priv\xE9) **\xE0 ").concat(message === null || message === void 0 ? void 0 : (_message$author = message.author) === null || _message$author === void 0 ? void 0 : _message$author.username, "** : Bonne nuit !.\n\n            ").concat(time, " (Informations) **Shokkoth** est d\xE9connect\xE9.\n        ")); // client.destroy()
  }
}