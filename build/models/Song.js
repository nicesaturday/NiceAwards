"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var songSchema = new _mongoose["default"].Schema({
  title: {
    type: String
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
    type: Number,
    "default": Date.now
  }
});

var Song = _mongoose["default"].model("Song", songSchema);

var _default = Song;
exports["default"] = _default;