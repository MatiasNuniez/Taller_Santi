import mongoose from "mongoose";
import { productInterface } from "../interfaces/productInterface";

class ProductModel {
    public _model: mongoose.Model<productInterface>;

    constructor() {
        const productModel = new mongoose.Schema<productInterface>({
            nombre: {
                type: String,
                required: true
            },
            descripcion: {
                type: String,
                required: true,
                minlength: 10
            },
            cantidad:{
                type:Number,
                required:true,
            },
            costo: {
                type: Number,
                required: true
            },
            precio_u: {
                type: Number,
                required: true
            },
            idProvider: {
                type: String,
                require: true
            },
            categoria:{
                type:String,
                required:true
            },
            marca:{
                type:String,
                required:true
            },
            img:{
                type:String
            }
        });
        this._model = mongoose.model('Products', productModel);
    }
}

export const productModel = new ProductModel()._model;
