"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MY_STUFFS = void 0;

var FRAGMENTS = _interopRequireWildcard(require("../fragments"));

var MY_STUFFS = "#graphql\n    query {\n        myStuffs {\n            ...StuffInfosFragment\n            ...StuffStatsFragment\n            equipments {\n                name\n            }\n            public\n        }\n    }\n\n    ".concat(FRAGMENTS.STUFF_INFOS, "\n    ").concat(FRAGMENTS.STUFF_STATS, "\n");
exports.MY_STUFFS = MY_STUFFS;