import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    name: {type: String, maxLength :[25,"Name can't be greater thn 25 characters"]},
    email: {type: String, unique:true, required: true,
        match:[/.+\@.+\../, "please enter a valid email"]
    },
    password: {type:String,},
    type: {type:String , enum:['customer','seller']}
})