import UserModel from "./user.model.js";
import jwt from 'jsonwebtoken';
import UserRepository from "./user.repository.js";
import bcrypt from 'bcrypt';

export class UserController{
    constructor(){
        this.userRespository= new UserRepository;
    }
    async signUp(req, res){
        const{name, email , password, type}= req.body;
        // hashing the password
        const hashedPassword = await bcrypt.hash(password,12);
        const user = new UserModel(name, email, hashedPassword, type);
        await this.userRespository.signUp(user);
        res.status(201).send(user);
    }

    async signIn(req, res, next){
        try{
            //find user by email
            const user = await this.userRespository.findByEmail(req.body.email);
            if(!user){
                return res.status(400).send("Incorrect details");
            }else{
                //compare password with hashed password
                const result = bcrypt.compare(req.body.password , user.password);
                if(result){
                    const token = jwt.sign({userID : user._id , email : user.email},process.env.JWT_SECRET,{expiresIn : "1h"});
                    res.status(200).send(token);
                }else{
                    return res.status(400).send("Incorrect details");
                }
            }
        }
        catch(err){
            console.log(err);
            return res.status(500).send("Something went wrong");
        }
    }

    async resetPassword(req, res, next){
        const {newPassword} = req.body;
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        const userID = req.userID;
        try{
            await this.userRespository.resetPassword(userID, hashedPassword);
            return res.status(200).send("Password is updated");
        }catch(err){
            console.log(err);
            console.log("Passing error to middleware");
            next(err);
        }
    }
}