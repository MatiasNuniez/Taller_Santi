"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class CategoryModel {
    constructor() {
        const categorySchema = new mongoose_1.default.Schema({
            nombre: {
                type: String,
                required: true,
                unique: true
            },
            urlImg: {
                type: String
            },
            marca: {
                type: String,
                required: true
            }
        });
        this._model = mongoose_1.default.model('Categories', categorySchema);
    }
}
exports.categoryModel = new CategoryModel()._model;
