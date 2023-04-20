"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _songController = require("../controllers/songController");

var _userController = require("../controllers/userController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var apiRouter = _express["default"].Router();

apiRouter.post("/music/:id([0-9a-f]{24})/view", _songController.viewAdd);
apiRouter["delete"]("/:id([0-9a-f]{24})/addHeart", _userController.addHeart);
apiRouter["delete"]("/:id([0-9a-f]{24})/deleteHeart", _userController.deleteHeart);
var _default = apiRouter;
exports["default"] = _default;