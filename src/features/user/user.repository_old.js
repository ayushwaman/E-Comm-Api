import { Collection } from "mongodb";
import { ApplicationError } from "../../../error_handler/applicationError.js";
import { getDB } from "../../config/mongodb.js";

class UserRepository {
    async signUp(newUser){
        //1 get the database
        try{
        const db = getDB();
        //2 get the collection
        const collection = db.collection("users");
        
        // newUser.id= users.length+1;
        // users.push(newUser);

        //3 insert document
        await collection.insertOne(newUser)
        return newUser;
        }
        catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong", 500);
        }
    }

    async signIn(email, password){
        //1 get the database
        try{
        const db = getDB();
        //2 get the collection
        const collection = db.collection("users");
        
        // newUser.id= users.length+1;
        // users.push(newUser);

        //3 find document
        return await collection.findOne({email, password});
        
        }
        catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong", 500);
        }
    }

    async findByEmail(email){
        //1 get the database
        try{
        const db = getDB();
        //2 get the collection
        const collection = db.collection("users");
        
        // newUser.id= users.length+1;
        // users.push(newUser);

        //3 find document
        return await collection.findOne({email});
        
        }
        catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong", 500);
        }
    }
}

export default UserRepository;