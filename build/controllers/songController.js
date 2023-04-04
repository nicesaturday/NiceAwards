"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.viewAdd = exports.postUpload = exports.getUpload = exports.home = void 0;

var _regeneratorRuntime = require("regenerator-runtime");

var _Song = _interopRequireDefault(require("../models/Song"));

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var home = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var music;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _Song["default"].find({}).sort({
              "meta.views": -1
            });

          case 2:
            music = _context.sent;
            return _context.abrupt("return", res.render("home", {
              pageTitle: "Home",
              music: music
            }));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function home(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.home = home;

var getUpload = function getUpload(req, res) {
  return res.render("upload", {
    pageTitle: "upload"
  });
};

exports.getUpload = getUpload;

var postUpload = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var title, _req$files, music, image;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            title = req.body.title;
            _req$files = req.files, music = _req$files.music, image = _req$files.image;
            console.log(music, image);
            console.log(req.body);
            _context2.prev = 4;
            _context2.next = 7;
            return _Song["default"].create({
              title: title,
              fileUrl: music[0].path.replace(/[\\]/g, "/"),
              thumbUrl: image[0].path.replace(/[\\]/g, "/")
            });

          case 7:
            return _context2.abrupt("return", res.redirect("/"));

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](4);
            console.log(_context2.t0);
            return _context2.abrupt("return", res.status(400).render("upload", {
              pageTitle: "Upload",
              errorMessage: _context2.t0._message
            }));

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[4, 10]]);
  }));

  return function postUpload(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.postUpload = postUpload;

var viewAdd = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var id, music;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;
            console.log(id, "sex");
            _context3.next = 4;
            return _Song["default"].findById(id);

          case 4:
            music = _context3.sent;

            if (music) {
              _context3.next = 7;
              break;
            }

            return _context3.abrupt("return", res.sendStatus(404));

          case 7:
            music.meta.views = music.meta.views + 1;
            _context3.next = 10;
            return music.save();

          case 10:
            return _context3.abrupt("return", res.sendStatus(200));

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function viewAdd(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.viewAdd = viewAdd;