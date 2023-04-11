const audioControl = document.getElementById("audio__control");
const audio = document.querySelectorAll("audio");
const Search = document.getElementById("searched")


const endHandler = (e) => {
    const {id} = e.srcElement.parentElement.dataset;
    fetch(`api/music/${id}/view`,{
        method:"POST",
    });
    console.log(id)
}

audio.forEach(function(item){
    item.addEventListener("ended",(e) =>endHandler(e)
 ) })
    
