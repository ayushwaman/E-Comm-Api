import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";
import { ApplicationError } from "../../../error_handler/applicationError.js";

//creating model from schema
const UserModel = mongoose.model('User', userSchema);


export default class UserRepository{

    async resetPassword(userID, hashedPassword){
        try{
            let user = await UserModel.findById(userID);
            user.password = hashedPassword;
            user.save();
        }catch(err){
                console.log(err);
                throw new ApplicationError("Something went wrong", 500);
        }
    }
    
        async signUp(user){
            try{
                //  create instance of model
              const newUser = new UserModel(user);
              await newUser.save();
              return newUser;
            }catch(err){
                console.log(err);
                throw new ApplicationError("Something went wrong", 500);
            }
}

    async signIn(){
        try{
           return await UserModel.findOne({email, password});
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong", 500);
        }
    }

    async findByEmail(email){
        try{
            return await UserModel.findOne({email});
        }
        catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong", 500);
        }
    }
}