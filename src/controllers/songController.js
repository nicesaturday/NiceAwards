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
    await Song.create({
      title,
      fileUrl: music[0].path.replace(/[\\]/g,"/") ,
      thumbUrl: image[0].path.replace(/[\\]/g,"/"),
      owner: _id
    })
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
  const music = await Song.findById(id)
  console.log(music)
  return res.render("musicInfo",{pageTitle:music.title,music})
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