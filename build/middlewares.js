"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadImage = exports.uploadMusic = exports.localsMiddleware = void 0;

var _multer = _interopRequireDefault(require("multer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var localsMiddleware = function localsMiddleware(req, res, next) {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "XXXX";
  res.locals.loggedInUser = req.session.user || {};
  next();
};

exports.localsMiddleware = localsMiddleware;
var uploadMusic = (0, _multer["default"])({
  dest: "uploads/music",
  limits: {
    fileSize: 30000000
  }
});
exports.uploadMusic = uploadMusic;
var uploadImage = (0, _multer["default"])({
  dest: "uploads/image/",
  limits: {
    fileSize: 300000000
  }
});
exports.uploadImage = uploadImage;