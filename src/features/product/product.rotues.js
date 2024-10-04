// MAnage routes of products module

// 1. import express
import express from 'express';
import ProductController from './product.controller.js';
import {upload} from '../../middleware/fileupload.middleware.js'
import jwtAuth from '../../middleware/jwtAuth.middleware.js';

const productController = new ProductController;
// Get router


const productRouter = express.Router();
productRouter.get('/filter',(req, res)=>{
    productController.filterProducts(req,res);
});
productRouter.post(
    '/rate',jwtAuth,
    (req, res, next)=>{
      productController.rateProduct(req, res, next)
   }
  );

productRouter.get("/",(req, res)=>{
    productController.getAllProducts(req,res);
});
productRouter.post("/",upload.single('imageUrl') ,(req, res)=>{
    productController.addProduct(req,res);
});
productRouter.get('/averagePrice',(req, res, next)=>{
    productController.averagePrice(req,res)
})
productRouter.get('/:id',(req, res)=>{
    productController.getOneProduct(req,res);
});
;

// productRouter.post('/rate',(req, res, next)=>{
//     productController.rateProduct(req,res,next);
// });

export default productRouter;