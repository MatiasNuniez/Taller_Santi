import mongoose, { Schema } from "mongoose";
import { UserInterface } from "../interfaces/userInterface";
import { UserTypes } from "../enums/userTypes";

class usersModel {

    public _model: mongoose.Model<UserInterface>

    constructor(){
        const userModel = new Schema<UserInterface>({
            nombre:{
                type:String,
                required:true
            },
            apellido:{
                type:String,
                required:true
            },
            direccion:{
                type:String,
                required:true
            },
            telefono:{
                type:String,
                minlength:10,
                required:true
            },
            rol:{
                type:String,
                enum:UserTypes,
                default:UserTypes.employed
            },
            password:{
                type:String,
                minlength:6,
                required:true
            },
            DNI:{
                type:String,
                required:true,
                unique:true
            },
            state:{
                type:Boolean,
                default:true
            }
        })
        this._model = mongoose.model('user', userModel)
    }
}

export const userModel = new usersModel()._model;