"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const loginRouter_1 = require("./routes/loginRouter");
const registerRouter_1 = require("./routes/registerRouter");
const providerRouter_1 = require("./routes/providerRouter");
const productRouter_1 = require("./routes/productRouter");
const cors_1 = __importDefault(require("cors"));
const categoryRouter_1 = require("./routes/categoryRouter");
class Server extends db_1.DataBase {
    constructor() {
        super();
        this.app = (0, express_1.default)();
        this.listen();
        this.app.use(express_1.default.json());
        this.config();
        this.connect();
        this.app.use('/api', this.routes());
    }
    config() {
        // Aplica CORS
        this.app.use((0, cors_1.default)({
            origin: '*', // Cambiar '*' a una URL específica si necesitas habilitar credenciales
        }));
        // Asegúrate de que express pueda parsear JSON
        this.app.use(express_1.default.json());
    }
    listen() {
        this.app.listen(3000, () => {
            console.log('Servidor corriendo en el puerto 3000');
        });
    }
    routes() {
        return [new loginRouter_1.LoginRouter().router, new registerRouter_1.RegisterRouter().router, new productRouter_1.ProductRouter().router, new providerRouter_1.ProviderRouter().router, new categoryRouter_1.CategoryRouter().router];
    }
}
new Server();
