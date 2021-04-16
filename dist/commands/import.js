"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = run;

var _axios = _interopRequireDefault(require("axios"));

var _graphql = require("../graphql");

function run(client, message, args) {
  var _axios$post = _axios["default"].post({
    query: _graphql.MUTATIONS.IMPORT_STUFF,
    variables: {
      link: 'https://d-bk.net/fr/d/OoFf'
    }
  }),
      data = _axios$post.data;

  message.reply('Actuellement sur la TODO list, déso ! :(');
}