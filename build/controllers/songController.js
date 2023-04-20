"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.playlist_list = exports.playlist = exports.musicDelete = exports.musicInfo = exports.search = exports.viewAdd = exports.postUpload = exports.getUpload = exports.home = void 0;

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
    var _id, title, _req$files, music, image, song;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _id = req.session.user._id;
            title = req.body.title;
            _req$files = req.files, music = _req$files.music, image = _req$files.image;
            console.log(music, image);
            console.log(req.body);
            _context2.prev = 5;
            _context2.next = 8;
            return _Song["default"].create({
              title: title,
              fileUrl: music[0].location,
              thumbUrl: image[0].location,
              owner: _id
            });

          case 8:
            song = _context2.sent;
            console.log(song);
            return _context2.abrupt("return", res.redirect("/"));

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](5);
            console.log(_context2.t0);
            return _context2.abrupt("return", res.status(400).render("upload", {
              pageTitle: "Upload",
              errorMessage: _context2.t0._message
            }));

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[5, 13]]);
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
            _context3.next = 3;
            return _Song["default"].findById(id);

          case 3:
            music = _context3.sent;

            if (music) {
              _context3.next = 6;
              break;
            }

            return _context3.abrupt("return", res.sendStatus(404));

          case 6:
            music.meta.views = music.meta.views + 1;
            _context3.next = 9;
            return music.save();

          case 9:
            return _context3.abrupt("return", res.sendStatus(200));

          case 10:
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

var search = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var search, music;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            search = req.body.search;
            music = [];

            if (!search) {
              _context4.next = 8;
              break;
            }

            _context4.next = 5;
            return _Song["default"].find({
              title: {
                $regex: new RegExp(search, "i")
              }
            });

          case 5:
            music = _context4.sent;
            _context4.next = 10;
            break;

          case 8:
            if (!(search == "")) {
              _context4.next = 10;
              break;
            }

            return _context4.abrupt("return", res.redirect("/"));

          case 10:
            return _context4.abrupt("return", res.render("search", {
              pageTitle: "Search",
              music: music
            }));

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function search(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.search = search;

var musicInfo = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var id, music, music2;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;
            console.log(id);
            _context5.next = 4;
            return _Song["default"].find({}).sort({
              "meta.views": -1
            });

          case 4:
            music = _context5.sent;
            _context5.next = 7;
            return _Song["default"].findById(id);

          case 7:
            music2 = _context5.sent;
            console.log(music2);
            return _context5.abrupt("return", res.render("musicInfo", {
              pageTitle: music2.title,
              music: music,
              music2: music2
            }));

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function musicInfo(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.musicInfo = musicInfo;

var musicDelete = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var id, _id, music;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            id = req.params.id;
            _id = req.session.user._id;
            _context6.next = 4;
            return _Song["default"].findById(id);

          case 4:
            music = _context6.sent;

            if (music) {
              _context6.next = 7;
              break;
            }

            return _context6.abrupt("return", res.status(404).render("musicInfo", {
              pageTitle: "musicInfo",
              errorMessage: "노레가 없습니다."
            }));

          case 7:
            if (!(String(music.owner) !== String(_id))) {
              _context6.next = 9;
              break;
            }

            return _context6.abrupt("return", res.status(403).redirect("/"));

          case 9:
            _context6.next = 11;
            return _Song["default"].findByIdAndRemove(id, function (err, data) {
              if (err) {
                return res.status(500).send("실패");
              } else {
                return res.redirect("/");
              }
            });

          case 11:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function musicDelete(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.musicDelete = musicDelete;

var playlist = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var id, music, user;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            id = req.params.id;
            _context7.next = 3;
            return _Song["default"].find({}).sort({
              "meta.views": -1
            });

          case 3:
            music = _context7.sent;
            _context7.next = 6;
            return _User["default"].findById(id).populate("playlist");

          case 6:
            user = _context7.sent;
            return _context7.abrupt("return", res.render("playlist", {
              pageTitle: "Playlist",
              user: user,
              music: music
            }));

          case 8:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function playlist(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

exports.playlist = playlist;

var playlist_list = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var id, userId, music2, user;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            id = req.params.id;
            console.log(id);
            userId = req.session.user._id;
            _context8.next = 5;
            return _Song["default"].findById(id);

          case 5:
            music2 = _context8.sent;
            _context8.next = 8;
            return _User["default"].findById(userId).populate("playlist");

          case 8:
            user = _context8.sent;
            console.log(user.playlist);
            return _context8.abrupt("return", res.render("playlist_list", {
              pageTitle: music2.title,
              user: user,
              music2: music2
            }));

          case 11:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function playlist_list(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

exports.playlist_list = playlist_list;