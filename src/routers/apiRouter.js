import express  from "express";
import { viewAdd , Search, musicDelete} from "../controllers/songController";


const apiRouter = express.Router();


apiRouter.post("/music/:id([0-9a-f]{24})/view",viewAdd);

export default apiRouter;