"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _songController = require("../controllers/songController");

var _middlewares = require("../middlewares");

var _userController = require("../controllers/userController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var rootRouter = _express["default"].Router();

rootRouter.get("/", _songController.home);
rootRouter.get("/:id([0-9a-f]{24})", _songController.musicInfo);
rootRouter.route("/upload").get(_songController.getUpload).post(_middlewares.uploadMusic.fields([{
  name: "music",
  maxCount: 1
}, {
  name: "image",
  maxCount: 1
}]), _songController.postUpload);
rootRouter.route("/login").get(_userController.getLogin).post(_userController.postLogin);
rootRouter.route("/join").get(_userController.getJoin).post(_userController.postJoin);
rootRouter.post("/search", _songController.search);
rootRouter.get("/:id([0-9a-f]{24})/delete", _songController.musicDelete);
var _default = rootRouter;
exports["default"] = _default;