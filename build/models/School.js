"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var schoolSchema = new _mongoose.Schema({
  name: String
}, {
  versionKey: false
});
var _default = (0, _mongoose.model)("School", schoolSchema);
exports["default"] = _default;