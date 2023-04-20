"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadImage = exports.uploadMusic = exports.localsMiddleware = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _multerS = _interopRequireDefault(require("multer-s3"));

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var s3 = new _awsSdk["default"].S3({
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET
  }
});
var multerUploader = (0, _multerS["default"])({
  s3: s3,
  bucket: "pinkmelon",
  acl: "public-read"
});

var localsMiddleware = function localsMiddleware(req, res, next) {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "pink-melon";
  res.locals.loggedInUser = req.session.user || {};
  next();
};

exports.localsMiddleware = localsMiddleware;
var uploadMusic = (0, _multer["default"])({
  dest: "uploads/music",
  limits: {
    fileSize: 300000000000000000000
  },
  storage: multerUploader
});
exports.uploadMusic = uploadMusic;
var uploadImage = (0, _multer["default"])({
  dest: "uploads/image/",
  limits: {
    fileSize: 3000000000000000000000
  },
  storage: multerUploader
});
exports.uploadImage = uploadImage;