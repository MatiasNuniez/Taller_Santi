"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class ProductModel {
    constructor() {
        const productModel = new mongoose_1.default.Schema({
            nombre: {
                type: String,
                required: true
            },
            descripcion: {
                type: String,
                required: true,
                minlength: 10
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
            categoria: {
                type: String,
                required: true
            },
            marca: {
                type: String,
                required: true
            },
            img: {
                type: String
            }
        });
        this._model = mongoose_1.default.model('Products', productModel);
    }
}
exports.productModel = new ProductModel()._model;
