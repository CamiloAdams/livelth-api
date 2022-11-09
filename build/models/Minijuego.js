"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var minijuegoSchema = new _mongoose.Schema({
  name: String,
  numero: Number
}, {
  versionKey: false
});
var _default = (0, _mongoose.model)("Minijuego", minijuegoSchema);
exports["default"] = _default;