const audioControl = document.getElementById("audio__control");
const audio = document.querySelector("audio");

const currenTime = document.getElementById("currenTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("volume");
const timeline = document.getElementById("timeline");


const whiteHeart = document.querySelectorAll("c");

const redHeart = document.querySelectorAll("b");

const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");


let volumeValue = 0.5;
audio.volume = volumeValue;

const endHandler = (e) => {
    const {fd} = e.srcElement.parentElement.dataset;
    fetch(`/api/music/${fd}/view`,{
        method:"POST",
    });

}


audio.addEventListener("ended",(e) =>endHandler(e))
    

const clickWhite = (e) => {
    const {id} = e.srcElement.parentElement.dataset;
    const p = e.srcElement.parentElement;
    const heart = e.target;
    const respone = fetch(`api/${id}/addHeart`,{
        method:"delete",
    })
    heart.remove();
    const newHeart = document.createElement("b");
    newHeart.id = "redHeart";
    newHeart.innerText = "✔";
    console.log(newHeart);
    p.appendChild(newHeart);
    

    }

if(whiteHeart){
    whiteHeart.forEach(function(item){
        item.addEventListener("click", (e) => clickWhite(e))
    })
}

const clickRed = (e) => {
    const {id} = e.srcElement.parentElement.dataset;
    const p = e.srcElement.parentElement;
    const heart = e.target;
    fetch(`/api/${id}/deleteHeart`,{
        method: "delete",
    })
    heart.remove();
    const newHeart = document.createElement("c");
    newHeart.id = "whiteHeart";
    newHeart.innerText = "✔";
    console.log(newHeart);
    p.appendChild(newHeart);
}

if(redHeart){
    redHeart.forEach(function(item){
        item.addEventListener("click", (e) => clickRed(e))
        })
}

const handlePlayClick = () => {
    if(audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}


const handlePlay = () => {playBtn.innerText = "⏸"}
const handlePause = () => {playBtn.innerText = "▶"}



const handleVolumeChange = (event) => {
    const {target: {value}} = event;
    if (audio.muted) {
        audio.muted = false;
    }
    volumeValue = value;
    audio.volume = value;
    console.log(value);
}

const formatTime = (seconds) => 
   new Date(seconds*1000).toISOString().substring(13,19);


const handleTimeUpdate = (event) => {
    currenTime.innerText = formatTime(Math.floor(audio.currentTime));
    timeline.value = Math.floor(audio.currentTime);
}

const handleTimelineChange = (event) => {
    const {target:{value}} = event;
    audio.currentTime = value;
}

playBtn.addEventListener("click",handlePlayClick);
audio.addEventListener("pause",handlePause)
audio.addEventListener("play",handlePlay)
volumeRange.addEventListener("input",handleVolumeChange)
audio.addEventListener("loadedmetadata",handleLoadedMetadata);
if (audio.readyState >= 2){
    handleLoadedMetadata();
 }
 function handleLoadedMetadata() {
     totalTime.innerText = formatTime(Math.floor(audio.duration));
     timeline.max = Math.floor(audio.duration);
     console.log(audio.duration);}
audio.addEventListener("timeupdate",handleTimeUpdate);
timeline.addEventListener("input", handleTimelineChange);