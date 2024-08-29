"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataBase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class DataBase {
    constructor() {
        this.connect();
    }
    connect() {
        try {
            mongoose_1.default.connect('mongodb://localhost:27017/taller');
            console.log('Conectado a la base de datos');
        }
        catch (error) {
            console.log('Error al conectar a la base de datos');
        }
    }
}
exports.DataBase = DataBase;
