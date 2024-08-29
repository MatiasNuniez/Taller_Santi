"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const userTypes_1 = require("../enums/userTypes");
// Creamos el modelo para poder manejar los datos requeridos
class usersModel {
    constructor() {
        const userModel = new mongoose_1.Schema({
            nombre: {
                type: String,
                required: true
            },
            apellido: {
                type: String,
                required: true
            },
            direccion: {
                type: String,
                required: true
            },
            telefono: {
                type: String,
                minlength: 10,
                required: true
            },
            rol: {
                type: String,
                enum: userTypes_1.UserTypes,
                default: userTypes_1.UserTypes.employed
            },
            password: {
                type: String,
                minlength: 6,
                required: true
            },
            DNI: {
                type: String,
                required: true
            },
            state: {
                type: Boolean,
                default: true
            }
        });
        // Creamos el modelo
        this._model = mongoose_1.default.model('user', userModel);
    }
}
// Exportamos el modelo para poder manejarlo en otros lados del programa.
exports.userModel = new usersModel()._model;
