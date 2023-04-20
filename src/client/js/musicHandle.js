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



const endHandler = (e) => {
    const {fd} = e.srcElement.parentElement.dataset;
    fetch(`/api/music/${fd}/view`,{
        method:"POST",
    });

}

if (audio){
audio.addEventListener("ended",(e) =>endHandler(e))
    
}
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


const handlePlay = () => {playBtn.innerText = "||"}
const handlePause = () => {playBtn.innerText = "▶"}






if(playBtn, audio){
playBtn.addEventListener("click",handlePlayClick);
audio.addEventListener("pause",handlePause)
audio.addEventListener("play",handlePlay)
}