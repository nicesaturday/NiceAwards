import express from "express";
import { home , getUpload, postUpload, search, musicInfo , musicDelete} from "../controllers/songController";
import { uploadMusic,uploadImage } from "../middlewares";
import { getJoin, getLogin, postJoin, postLogin } from "../controllers/userController";


const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/:id([0-9a-f]{24})",musicInfo)
rootRouter.route("/upload")
.get(getUpload)
.post(uploadMusic.fields([
    {name:"music",maxCount:1}
    ,{name:"image",maxCount:1}
]),
postUpload);
rootRouter.route("/login").get(getLogin).post(postLogin);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.post("/search",search);
rootRouter.get("/:id([0-9a-f]{24})/delete",musicDelete);
export default rootRouter;
