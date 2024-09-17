"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterRouter = void 0;
const registerController_1 = require("../controllers/registerController");
const baseRouter_1 = require("./baseRouter");
// Creamos la clase para registar un usuario
class RegisterRouter extends baseRouter_1.BaseRouter {
    constructor() {
        super(registerController_1.RegisterController);
    }
    // Rutas para las peticiones de register
    routes() {
        this.router.post('/register', (req, res) => this.controller.regUser(req, res));
    }
}
exports.RegisterRouter = RegisterRouter;
