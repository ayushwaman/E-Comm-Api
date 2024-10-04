
import CartItemModel from "./cartItem.model.js";
import CartItemRepository from "./cartItem.repository.js";

export class CartItemController {
    constructor(){
        this.cartItemRepository = new CartItemRepository();
      }
    async add(req, res){
        try{
            const {productID, quantity} = req.body;
            const userID = req.userID;
            await this.cartItemRepository.add(productID, userID, quantity);
            res.status(201).send("Cart is updated");
        }catch(err){
            console.log(err);
            return res.status(200).send("Something went wrong");
        }
        
    }
    async get(req, res){
        try{
            const userID = req.userID;
            const items = await this.cartItemRepository.get(userID);
            return res.status(200).send(items);
        }catch(err){
            console.log(err);
            return res.status(200).send("Something went wrong");
        }
        
    }
    async delete(req, res){
        const userID = req.userID;
        const cartItemID = req.params.id;
        const isDeleted = await this.cartItemRepository.delete(cartItemID,userID);
        if(!isDeleted){
            return res.status(400).send("Item is not found")
        }else{
            return res.status(200).send("deleted successfully");
        }
    }
}