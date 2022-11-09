"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _package = _interopRequireDefault(require("../package.json"));
var _cors = _interopRequireDefault(require("cors"));
var _initialSetup = require("./libs/initialSetup");
var _auth = _interopRequireDefault(require("./routes/auth.routes"));
var _score = _interopRequireDefault(require("./routes/score.routes"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();
(0, _initialSetup.createRoles)();
(0, _initialSetup.createSchools)();
(0, _initialSetup.createAdminUser)();
(0, _initialSetup.createMiniGames)();
app.set("pkg", _package["default"]);
app.use(_express["default"].json());
app.use((0, _morgan["default"])("dev"));
app.use((0, _cors["default"])());
app.get("/", function (req, res) {
  res.json({
    name: app.get("pkg").name,
    author: app.get("pkg").author,
    description: app.get("pkg").description,
    version: app.get("pkg").version
  });
});
app.use("/api/auth", _auth["default"]);
app.use("/api/scores", _score["default"]);
var _default = app;
exports["default"] = _default;