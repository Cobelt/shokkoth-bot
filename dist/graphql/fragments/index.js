"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.STUFF_STATS = exports.STUFF_INFOS = void 0;
var STUFF_INFOS = "#graphql\n    fragment StuffInfosFragment on Stuff {\n        _id\n        name\n        level\n        gender\n        breed {\n            name\n        }\n    }\n";
exports.STUFF_INFOS = STUFF_INFOS;
var STUFF_STATS = "#graphql\n    fragment StuffStatsFragment on Stuffs {\n        stats {\n            attributed {\n                VITALITY\n                WIDSDOM\n                STRENGTH\n                INTELLIGENCE\n                CHANCE\n                AGILITY\n            }\n            scroll {\n                VITALITY\n                WIDSDOM\n                STRENGTH\n                INTELLIGENCE\n                CHANCE\n                AGILITY\n            }\n        }\n    }\n";
exports.STUFF_STATS = STUFF_STATS;