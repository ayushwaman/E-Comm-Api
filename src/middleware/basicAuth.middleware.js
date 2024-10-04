import UserModel from "../features/user/user.model.js";


const basicAuthrizer =  (req, res, next)=>{


    //1. check if authorisation header is empty

    const authHeader = req.headers["authorization"];
    
    if (!authHeader){
        return res.status(201).send("No authorization details found");
    }
    console.log(authHeader);
    //2 extract credentials
    const base64Credentials = authHeader.replace('Basic','') ;
    console.log(base64Credentials);
    //3decode credentilas

    const decodedCreds = Buffer.from(base64Credentials, 'base64').toString('utf8');
    console.log(decodedCreds);

    const creds = decodedCreds.split(':');

    const user = UserModel.getAll().find(u=> u.email == creds[0] && u.password == creds[1]);
    if(user){
        next();
    }
    else{
        return res.status(401).send("incorrect credentials");
    }
}


export default basicAuthrizer;