import mongoose from "mongoose";
import { productInterface } from "../interfaces/productInterface";

class ProductModel {
    public _model: mongoose.Model<productInterface>

    constructor(){
        const productModel = new mongoose.Schema<productInterface>({
            nombre:{
                type:String,
                require:true
            },
            descripcion:{
                type:String,
                required:true,
                minlength:10
            },
            costo:{
                type:Number,
                required:true
            },
            precio_u:{
                type:Number,
                required:true
            }
        })
        this._model = mongoose.model('ProductModel', productModel)
    }
}

export const ModelProduct = new ProductModel()._model; 