import { ApplicationError } from "../../../error_handler/applicationError.js";
import { getDB } from "../../config/mongodb.js";

export default class UserModel {
    constructor(name, email, password, type, id){
        this.name = name;
        this.email = email;
        this.password = password;
        this.type = type;
        this.id = id;
    }

    static getAll(){
        return users;
    }
}

let users=[{
    id:1,
    "name":'selleradmin',
    'email':'seller@ecom.com',
    'password': 'Password1',
    'type': "seller",
},
    {
        id:2,
        "name":'customer user',
        'email':'customer@ecom.com',
        'password': 'Password2',
        'type': "customer",
    }
]