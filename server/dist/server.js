"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const loginRouter_1 = require("./routes/loginRouter");
const registerRouter_1 = require("./routes/registerRouter");
class Server extends db_1.DataBase {
    constructor() {
        super();
        this.app = (0, express_1.default)();
        this.listen();
        this.app.use(express_1.default.json());
        this.connect();
        this.app.use('/api', this.routes());
    }
    listen() {
        this.app.listen(3000, () => {
            console.log('Servidor corriendo en el puerto 3000');
        });
    }
    routes() {
        return [new loginRouter_1.LoginRouter().router, new registerRouter_1.RegisterRouter().router];
    }
}
new Server();
