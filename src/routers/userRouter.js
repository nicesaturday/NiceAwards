import express from "express";
import { finishGithubLogin, editGetProfile, logout, editPostProfile, startGithubLogin, profile } from "../controllers/userController";

const usersRouter = express.Router();


usersRouter.get("/logout",logout);
usersRouter.get("/github/start",startGithubLogin);
usersRouter.get("/github/finish",finishGithubLogin);
usersRouter.get("/profile/:id([0-9a-f]{24})",profile)
usersRouter.route("/profile/:id([0-9a-f]{24})/edit").get(editGetProfile).post(editPostProfile);

export default usersRouter;