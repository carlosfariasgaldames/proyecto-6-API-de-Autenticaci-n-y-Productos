"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Roles = void 0;
var _mongoose = require("mongoose");
var Roles = exports.Roles = ["user", "admin", "moderator"];
var roleSchema = new _mongoose.Schema({
  name: String
}, {
  versionKey: false
});
var _default = exports["default"] = (0, _mongoose.model)("role", roleSchema);