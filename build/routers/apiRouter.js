"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _songController = require("../controllers/songController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var apiRouter = _express["default"].Router();

apiRouter.post("/music/:id([0-9a-f]{24})/view", _songController.viewAdd);
var _default = apiRouter;
exports["default"] = _default;