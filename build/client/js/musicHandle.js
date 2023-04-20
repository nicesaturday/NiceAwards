"use strict";

var audioControl = document.getElementById("audio__control");
var audio = document.querySelector("audio");
var currenTime = document.getElementById("currenTime");
var totalTime = document.getElementById("totalTime");
var volumeRange = document.getElementById("volume");
var timeline = document.getElementById("timeline");
var whiteHeart = document.querySelectorAll("c");
var redHeart = document.querySelectorAll("b");
var playBtn = document.getElementById("play");
var muteBtn = document.getElementById("mute");

var endHandler = function endHandler(e) {
  var fd = e.srcElement.parentElement.dataset.fd;
  fetch("/api/music/".concat(fd, "/view"), {
    method: "POST"
  });
};

if (audio) {
  audio.addEventListener("ended", function (e) {
    return endHandler(e);
  });
}

var clickWhite = function clickWhite(e) {
  var id = e.srcElement.parentElement.dataset.id;
  var p = e.srcElement.parentElement;
  var heart = e.target;
  var respone = fetch("api/".concat(id, "/addHeart"), {
    method: "delete"
  });
  heart.remove();
  var newHeart = document.createElement("b");
  newHeart.id = "redHeart";
  newHeart.innerText = "✔";
  console.log(newHeart);
  p.appendChild(newHeart);
};

if (whiteHeart) {
  whiteHeart.forEach(function (item) {
    item.addEventListener("click", function (e) {
      return clickWhite(e);
    });
  });
}

var clickRed = function clickRed(e) {
  var id = e.srcElement.parentElement.dataset.id;
  var p = e.srcElement.parentElement;
  var heart = e.target;
  fetch("/api/".concat(id, "/deleteHeart"), {
    method: "delete"
  });
  heart.remove();
  var newHeart = document.createElement("c");
  newHeart.id = "whiteHeart";
  newHeart.innerText = "✔";
  console.log(newHeart);
  p.appendChild(newHeart);
};

if (redHeart) {
  redHeart.forEach(function (item) {
    item.addEventListener("click", function (e) {
      return clickRed(e);
    });
  });
}

var handlePlayClick = function handlePlayClick() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
};

var handlePlay = function handlePlay() {
  playBtn.innerText = "||";
};

var handlePause = function handlePause() {
  playBtn.innerText = "▶";
};

if (playBtn, audio) {
  playBtn.addEventListener("click", handlePlayClick);
  audio.addEventListener("pause", handlePause);
  audio.addEventListener("play", handlePlay);
}