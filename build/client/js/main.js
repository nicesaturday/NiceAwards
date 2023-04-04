"use strict";

require("../scss/styles.scss");

var _regeneratorRuntime = _interopRequireDefault(require("regenerator-runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var title = document.getElementById("title");

var notSubmit = function notSubmit(event) {
  event.preventDefault();
};

title.addEventListener("click", notSubmit);
console.log("hi");