import express from "express";
import { finishGithubLogin, editGetProfile, logout, editPostProfile, startGithubLogin, profile } from "../controllers/userController";
import { playlist, playlist_list } from "../controllers/songController";

const usersRouter = express.Router();


usersRouter.get("/logout",logout);
usersRouter.get("/github/start",startGithubLogin);
usersRouter.get("/github/finish",finishGithubLogin);
usersRouter.get("/profile/:id([0-9a-f]{24})",profile)
usersRouter.route("/profile/:id([0-9a-f]{24})/edit").get(editGetProfile).post(editPostProfile);
usersRouter.get("/profile/:id([0-9a-f]{24})/playlist",playlist)
usersRouter.get("/playList/:id([0-9a-f]{24})",playlist_list)

export default usersRouter;