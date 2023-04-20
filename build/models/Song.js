"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var now = new Date();
var year = now.getFullYear();
var month = ("0" + (now.getMonth() + 1)).slice(-2);
var date = ("0" + now.getDate()).slice(-2);
var hour = ("0" + now.getHours()).slice(-2);
var min = ("0" + now.getMinutes()).slice(-2);
var sec = ("0" + now.getSeconds()).slice(-2);
var time = "".concat(year, "\uB144-").concat(month, "\uC6D4-").concat(date, "\uC77C-").concat(hour, ":").concat(min, ":").concat(sec);
var songSchema = new _mongoose["default"].Schema({
  title: {
    type: String,
    unique: true
  },
  fileUrl: {
    type: String,
    required: true
  },
  thumbUrl: {
    type: String
  },
  meta: {
    views: {
      type: Number,
      "default": 0,
      required: true
    },
    rating: {
      type: Number,
      "default": 0,
      required: true
    }
  },
  count: {
    type: String,
    "default": time
  },
  owner: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
});

var Song = _mongoose["default"].model("Song", songSchema);

var _default = Song;
exports["default"] = _default;