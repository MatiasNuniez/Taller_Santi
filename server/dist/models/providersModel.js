"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.providerModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class providersModel {
    constructor() {
        const providerModel = new mongoose_1.default.Schema({
            nombre: {
                type: String,
                required: true
            },
            apellido: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            direccion: {
                type: String,
                required: true
            },
            telefono: {
                type: String,
                required: true
            },
            cuit: {
                type: String,
                required: true,
                unique: true
            }
        });
        this._model = mongoose_1.default.model("Providers", providerModel);
    }
}
exports.providerModel = new providersModel()._model;
