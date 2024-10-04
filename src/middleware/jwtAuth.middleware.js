import jwt from 'jsonwebtoken';

const jwtAuth = (req, res , next)=>{
    //1 read the token 
    //console.log(req.headers);
    const token = req.headers["authorization"];
    
        console.log(token);
    //2 if no token, return error.
    if(!token){
        return res.status(401).send("Unauthorized")
    }
    //3 check if token is valid or not
    try{
        const payload = jwt.verify(token, "EvV4DmcWrJsHRbzLc4c0gpCEt1EEs1yS");
        req.userID = payload.userID;
        console.log(payload);
    }
    //5 return error
    catch(err){
        return res.status(401).send("Unauthorized")
    }
    //4 call next middleware
    next();
}


export default jwtAuth;