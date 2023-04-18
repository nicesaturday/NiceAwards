import express  from "express";
import { viewAdd , Search, musicDelete} from "../controllers/songController";
import { addHeart, deleteHeart } from "../controllers/userController";


const apiRouter = express.Router();


apiRouter.post("/music/:id([0-9a-f]{24})/view",viewAdd);
apiRouter.delete("/:id([0-9a-f]{24})/addHeart",addHeart);
apiRouter.delete("/:id([0-9a-f]{24})/deleteHeart",deleteHeart);

export default apiRouter;