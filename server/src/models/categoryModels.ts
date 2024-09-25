import mongoose from "mongoose";
import { categoryInterface } from "../interfaces/categoryInterface";

class CategoryModel {
    public _model: mongoose.Model<categoryInterface>;

    constructor() {
        const categorySchema = new mongoose.Schema<categoryInterface>({
            nombre: {
                type: String,
                required: true,
                unique: true  
            },
            urlImg:{
                type:String
            },
            marca:{
                type:String,
                required:true
            }
        });
        this._model = mongoose.model('Categories', categorySchema);
    }
}

export const categoryModel = new CategoryModel()._model;