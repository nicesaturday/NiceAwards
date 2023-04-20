import { async } from "regenerator-runtime";
import Song from "../models/Song";
import User from "../models/User";

export const home = async (req, res) => {
  const music = await Song.find({}).sort({"meta.views":-1});
  return res.render("home", { pageTitle: "Home" , music});
};

export const getUpload = (req,res) => {
  return res.render("upload", { pageTitle: "upload"});
}

export const postUpload = async (req,res) => {
  const {_id} = req.session.user;
  const {title} = req.body;
  const {music,image} = req.files;
  console.log(music,image);
  console.log(req.body);
  try{
    const song = await Song.create({
      title,
      fileUrl: music[0].location ,
      thumbUrl: image[0].location,
      owner: _id
    })
    console.log(song);
    return res.redirect("/");
  } catch(error){
    console.log(error)
    return res.status(400).render("upload",{pageTitle:"Upload",errorMessage: error._message,})
  }

}

export const viewAdd = async (req,res) => {
  const {id} = req.params;
  const music = await Song.findById(id);
  if(!music) {
    return res.sendStatus(404);
  }
  music.meta.views = music.meta.views+1;
  await music.save();
  return res.sendStatus(200);
}

export const search = async (req,res) => {
  const {search} = req.body;
  let music = [];
  if (search) {
     music = await Song.find({
      title: {
        $regex: new RegExp(search,"i"),
      }
    })
  } else if(search == "") {
    return res.redirect("/");
  }
  return res.render("search", {pageTitle: "Search",music})
}

export const musicInfo = async (req,res) => {
  const {id} = req.params;
  console.log(id)
  const music = await Song.find({}).sort({"meta.views":-1});
  const music2 = await Song.findById(id)
  console.log(music2)
  return res.render("musicInfo",{pageTitle:music2.title,music,music2})
}

export const musicDelete = async (req,res) => {
  const {id} = req.params
  const {_id} = req.session.user;
  const music = await Song.findById(id);
  if (!music) {
    return res.status(404).render("musicInfo",{pageTitle: "musicInfo", errorMessage:"노레가 없습니다."})
  }
  if(String(music.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }

  await Song.findByIdAndRemove(id , (err,data) => {
    if (err) {
      return res.status(500).send("실패");
    } else {
      return res.redirect("/");
    }
  })
}

export const playlist = async (req,res) => {
  const {id} = req.params;
  const music = await Song.find({}).sort({"meta.views":-1});
  const user = await User.findById(id).populate("playlist");
  
  return res.render("playlist", {pageTitle: "Playlist", user,music})
}

export const playlist_list = async (req,res) => {
  const {id} = req.params;
  console.log(id)
  const userId = req.session.user._id;
  const music2 = await Song.findById(id);
  const user = await User.findById(userId).populate("playlist");
  console.log(user.playlist);
 
    return res.render("playlist_list",{pageTitle: music2.title, user,music2})
  
}