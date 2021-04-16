"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = run;

function run(client, message, args) {
  if (!(args.length > 0)) return message.reply('Must provide a command name to reload.');
  var commandName = args === null || args === void 0 ? void 0 : args[0]; // Check if the command exists and is valid

  if (!client.commands.has(commandName)) {
    return message.reply('That command does not exist');
  } // the path is relative to the *current folder*, so just ./filename.js


  delete require.cache[require.resolve("".concat(__dirname, "/").concat(commandName, ".js"))]; // We also need to delete and reload the command from the client.commands Enmap

  client.commands["delete"](commandName);

  var props = require("".concat(__dirname, "/").concat(commandName, ".js"));

  client.commands.set(commandName, props);
  message.reply("The command ".concat(commandName, " has been reloaded"));
}