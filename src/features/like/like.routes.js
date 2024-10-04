
import express from 'express';
import LikeController from './like.controller.js';


const likeController = new LikeController;

const likeRouter = express.Router();

likeRouter.post("/", (req, res, next)=>{
    likeController.likeItem(req, res, next)
});
likeRouter.get("/", (req, res, next)=>{
    likeController.getLikes(req, res, next)
});


export default likeRouter;