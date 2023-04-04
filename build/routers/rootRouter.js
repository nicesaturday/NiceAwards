"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _songController = require("../controllers/songController");

var _middlewares = require("../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var rootRouter = _express["default"].Router();

rootRouter.get("/", _songController.home);
rootRouter.route("/upload").get(_songController.getUpload).post(_middlewares.uploadMusic.fields([{
  name: "music",
  maxCount: 1
}, {
  name: "image",
  maxCount: 1
}]), _songController.postUpload);
var _default = rootRouter;
exports["default"] = _default;