"use strict";

require("../scss/styles.scss");

var _regeneratorRuntime = require("regenerator-runtime");

var title = document.getElementById("title");

var notSubmit = function notSubmit(event) {
  event.preventDefault();
};

if (title) {
  title.addEventListener("click", notSubmit);
}