import express from 'express';
import { UserController } from './user.controller.js';
import jwtAuth from "../../middleware/jwtAuth.middleware.js";

const userController = new UserController;
// Get router

const userRouter = express.Router();
userRouter.post("/signup", (req, res)=>{
    userController.signUp(req,res);
});
userRouter.post("/signin" ,(req, res)=>{
    userController.signIn(req,res);
});
userRouter.put("/resetPassword", jwtAuth, (req,res, next)=>{
    userController.resetPassword(req,res,next)
});

export default userRouter;