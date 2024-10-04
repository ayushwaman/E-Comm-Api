
import mongoose from 'mongoose';

export const likeSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    likeable:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'types'
    },
    types:{
        type:String,
        enum:['Product', 'Category']
    }
}).pre('save', (next)=>{
    console.log("New like coming in");
    next();
}).post('save', ()=>{
    console.log("Like is saved");
    console.log(doc);
})