import mongoose from "mongoose";

const now = new Date();
const year = now.getFullYear();
const month = ("0"+(now.getMonth()+1)).slice(-2);
const date = ("0"+now.getDate()).slice(-2);
const hour = ("0"+now.getHours()).slice(-2);
const min = ("0"+now.getMinutes()).slice(-2);
const sec = ("0"+now.getSeconds()).slice(-2);

const time = `${year}년-${month}월-${date}일-${hour}:${min}:${sec}`;

const songSchema = new mongoose.Schema({
    title:{type:String,unique:true},
    fileUrl: {type:String,required:true},
    thumbUrl:{type:String,},
    meta:{views:{type:Number,default:0,required:true},
          rating:{type:Number,default:0,required:true},
    },
    count:{type: String,default:time},
    owner:{type: mongoose.Schema.Types.ObjectId , required:true, ref:'User'}
});

const Song = mongoose.model("Song", songSchema);

export default Song;
