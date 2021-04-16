"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IMPORT_STUFF = exports.LOGIN = void 0;

var FRAGMENTS = _interopRequireWildcard(require("../fragments"));

var LOGIN = "#graphql\n    mutation($username: String, $password: String!) {\n        login(username: $username, password: $password)\n    }\n";
exports.LOGIN = LOGIN;
var IMPORT_STUFF = "#graphql\n    mutation ($link: String!) {\n        importStuff(link: $link) {\n            ...StuffInfosFragment\n            ...StuffStatsFragment\n            equipments {\n                name\n            }\n            public\n        }\n    }\n\n    ".concat(FRAGMENTS.STUFF_INFOS, "\n    ").concat(FRAGMENTS.STUFF_STATS, "\n");
exports.IMPORT_STUFF = IMPORT_STUFF;