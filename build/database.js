"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
_mongoose["default"].connect("mongodb://localhost/companydb", {
  useNewUrlParser: true
}).then(function (db) {
  return console.log('Db is connected');
})["catch"](function (error) {
  return console.log(error);
});