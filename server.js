import dotenv from 'dotenv';
dotenv.config()

import express from 'express';
import swagger from 'swagger-ui-express';
import productRouter from './src/features/product/product.rotues.js';
import bodyParser from 'body-parser';
import userRouter from './src/features/user/user.rotues.js';
import basicAuthrizer from './src/middleware/basicAuth.middleware.js';
import jwtAuth from './src/middleware/jwtAuth.middleware.js';
import cartRouter from './src/features/cart/cartItem.routes.js';
import apiDocs from './swagger.json' assert {type : "json"};
import cors from 'cors';
import loggerMiddleware from './src/middleware/logger.middleware.js';
import { ApplicationError } from './error_handler/applicationError.js';
import {connectToMongoDB} from './src/config/mongodb.js';
import orderRouter from './src/features/order/order.routes.js';
import { connectUsingMongoose } from './src/config/mongooseConfig.js';
import likeRouter from './src/features/like/like.routes.js';

const server = express();

//load all environment variables inapplications
// dotenv.config();
//server.use(bodyParser.json());
server.use(express.json());
server.use("/api-docs",swagger.serve, swagger.setup(apiDocs));
// CORS policy configuration
var corsOptions= {
    origin:'http://localhost:5500',
    allowedHeaders:'*'
}
server.use(cors(corsOptions));
// server.use((req, res, next)=>{
//     res.header('Access-Control-Allow-Origin', 'http://localhost:5500');
//     res.header('Access-Control-Allow-Headers','*');
//     res.header('Access-Control-Allow-Methods','*');
//     // return ok if preflight request
//     if(req.method == "OPTIONS"){
//         res.sendStatus(200);
//     }
//     next();
// })

// for all requests related to product, redirect to product routes.
server.use('/api/products', jwtAuth, productRouter );
server.use('/api/users', userRouter);
server.use('/api/cartItems', loggerMiddleware,jwtAuth,cartRouter);
server.use('/api/orders' ,jwtAuth, orderRouter);
server.use('/api/likes', jwtAuth, likeRouter);
server.use(loggerMiddleware);

// middleware to handle 404 request
server.use((req, res)=>{
    res.status(404).send("API not found")

})

server.get('/', (req, res)=>{
    res.send('Welcome to Ecommerce APIs')
});

server.use((err, req, res, next)=>{
    console.log(err);
    if(err instanceof ApplicationError){
        res.status(err.code).send(err.message);
    }


    //server errors
    res.status(500).send('Something is wrong, please try again later');
});
server.listen(3500, ()=>{
    console.log('server is listening at 3500');
    //connectToMongoDB();
    connectUsingMongoose();
});

