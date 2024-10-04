import express, { Router } from 'express';
import { CartItemController } from './cartItem.controller.js';


const cartItemController = new CartItemController;
// Get router

const cartRouter = express.Router();
cartRouter.post("/", (req, res, next)=>{
    cartItemController.add(req, res, next)
 });
cartRouter.get("/",(req, res, next)=>{
    cartItemController.get(req, res, next)
 });
cartRouter.delete("/:id",(req, res, next)=>{
    cartItemController.delete(req, res, next)
 });
export default cartRouter;