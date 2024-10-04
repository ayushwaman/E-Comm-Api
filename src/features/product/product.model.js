import { ApplicationError } from '../../../error_handler/applicationError.js';
import UserModel from '../user/user.model.js';

export default class ProductModel {
    constructor( name, desc,price, imageUrl, category, sizes,id)
    {
        this.name=name;
        this.desc=desc;
        this.price=price;
        this.imageUrl=imageUrl;
        this.category=category;
        this.sizes=sizes;
        this._id=id;
    }
    // static add(product){
    //   product.id = products.length+1
    //   products.push(product);
    // }

    // static get(id){
    //   const product =  products.find(i => i.id == id);
    //   return product;
    // }
    // static GetAll(){
    //     return products;
    // }

    // static filter(minPrice, maxPrice, category){
    //   const result = products.filter((product)=>{
    //     (!minPrice || product.price>=minPrice) && (!maxPrice || product.price<=maxPrice) && (!category || category == category)
    //   })
    //   return result;
    // }
    static rateProduct(userID, productID, rating){
      //1 validate user and product
      const user = UserModel.getAll().find((u)=> u.id=== userID );
      if(!user){
        throw new ApplicationError( "user not found",404);
      }

      const product = products.find((p)=> p.id == productID);
      if(!product){
        throw new ApplicationError( "product not found",400);
      }

      //check if there are any rating to product and if not then add to rating array
      if(!product.rating){
        product.rating = [];
        product.rating.push({userID : userID, rating : rating});
      }else{
        const existingRatingIndex = product.rating.findIndex((r)=> r.userID == userID);
        if (existingRatingIndex>=0) {
          product.rating[existingRatingIndex]= {
            userID : userID, rating : rating
          }
        }else{
          product.rating.push({userID : userID, rating : rating});
        }
      }
    }
}

var products = [
    new ProductModel(
      1,
      'Product 1',
      'Description for Product 10',
      19.99,
      'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
      'Category1',
      ['M','L','S']
    ),
    new ProductModel(
      2,
      'Product 2',
      'Description for Product 2',
      29.99,
      'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
      'Category2',
    ),
    new ProductModel(
      3,
      'Product 3',
      'Description for Product 3',
      39.99,
      'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
      'Category3',
      ['M','L','XXL']
    ),
  ];