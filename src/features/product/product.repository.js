import {ObjectId} from 'mongodb';
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from '../../../error_handler/applicationError.js';
import mongoose from 'mongoose';
import { productSchema } from './product.schema.js';
import { reviewSchema } from './reviews.schema.js';
import { categorySchema } from './category.schema.js';

const ProductModel = mongoose.model('Product', productSchema);
const ReviewModel = mongoose.model('Review', reviewSchema);
const CategoryModel = mongoose.model('Category', categorySchema);
class ProductRepository{

    constructor(){
        this.collection = "products";
    }
 
    async add(productData){
        try{
            // 1 . Get the db.
            // const db = getDB();
            // const collection = db.collection(this.collection);
            // await collection.insertOne(newProduct);
            // return newProduct;
            //1. add the product
            productData.categories= productData.category.split(',').map(e=>e.trim());
            console.log(productData);
            const newProduct = new CategoryModel(productData);
            const savedProduct = await newProduct.save();

            //2. update categories

            await CategoryModel.updateMany(
                {_id:{$in: productData.categories}},
                {
                    $push:{products: new ObjectId(savedProduct._id)}
                }
            )
        } catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async getAll(){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            const products = await collection.find().toArray();
            console.log(products);
            return products;
        } catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async get(id){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            return await collection.findOne({_id: new ObjectId(id)});
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async filter(minPrice,  category){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            let filterExpression={};
            if(minPrice){
                filterExpression.price = {$gte: parseFloat(minPrice)}
            }
            // if(maxPrice){
            //     filterExpression.price = {...filterExpression.price, $lte: parseFloat(maxPrice)}
            // }
            if(category){
                filterExpression={$and:[{category:category}, filterExpression]}
            }
            return await collection.find(filterExpression).project({name:1, price:1, _id:0, ratings:{$slice:1}}).toArray();
            // console.log(minPrice+"minPrice=" , maxPrice+"maxPrice=");
        }
        catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async rate(userID, productID, rating){
        // try{
        //     const db = getDB();
        //     const collection = db.collection(this.collection);
        //     //find the product
        //     const product = await collection.findOne({_id:new ObjectId(productID)});
        //     //find the rating
        //     const userRating = product?.ratings?.find(r=> r.userID === userID);
        //     if(userRating){
        //        // update the rating
        //        await collection.updateOne({
        //         _id:new ObjectId(productID), "ratings.userID": new ObjectId(userID)
        //        },{
        //         $set:{
        //             "ratings.$.rating":rating
        //         }
        //        })

        //     }else{
        //         await collection.updateOne({
        //             _id:new ObjectId(productID)
        //         },{
        //             $push: {ratings: {userID:new ObjectId(userID), rating}}
        //         })
        //     }
        // }catch(err){
        //     console.log(err);
        //     throw new ApplicationError("Something went wrong with database", 500);
        // }

        try{
            // const db = getDB();
            // const collection = db.collection(this.collection);
            // //1 remove existing entry
            // await collection.updateOne({
            //     _id:new ObjectId(productID)
            // },{
            //     $pull: {ratings: {userID:new ObjectId(userID)}}
            // })
            // //2 add new entry
            // await collection.updateOne({
            //     _id:new ObjectId(productID)
            // },{
            //      $push: {ratings: {userID:new ObjectId(userID), rating}}
            // })


            //1 check if product exist or not
            const productToUpdate = await ProductModel.findById(productID);
            if(!productToUpdate){
                throw new Error("Product not found");
            }
            //2 check for the existing review
            const userReview = await ReviewModel.findOne({product: new ObjectId(productID), user: new ObjectId(userID)});
            if(userReview){
                userReview.rating = rating;
                await userReview.save(); 
            }else{
                const newReview = new ReviewModel({
                    product: new ObjectId(productID), 
                    user: new ObjectId(userID),
                    rating: rating 
                })
                newReview.save();
            }
        }
        catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async averageProductPricePerCategory(){
        try{
            const db = getDB();
            return await db.collection(this.collection).aggregate([
                {
                    $group:{
                        _id:"$category",
                        averagePrice:{$avg:"$price"}
                    }
                }
            ]).toArray();
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

}

export default ProductRepository;