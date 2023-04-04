"use strict";

var audioControl = document.getElementById("audio__control");
var audio = document.querySelectorAll("audio");
var center = document.getElementById("Control_Center");

var endHandler = function endHandler(e) {
  var id = e.srcElement.parentElement.dataset.id;
  fetch("api/music/".concat(id, "/view"), {
    method: "POST"
  });
  console.log(id);
};

audio.forEach(function (item) {
  item.addEventListener("ended", function (e) {
    return endHandler(e);
  });
});