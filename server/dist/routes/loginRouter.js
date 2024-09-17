"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginRouter = void 0;
const loginController_1 = require("../controllers/loginController");
const baseRouter_1 = require("./baseRouter");
// Creamos la clase para loggear un usuario
class LoginRouter extends baseRouter_1.BaseRouter {
    constructor() {
        super(loginController_1.LoginController);
    }
    // Rutas para las peticiones de login
    routes() {
        this.router.post('/login', (req, res) => this.controller.login(req, res));
    }
}
exports.LoginRouter = LoginRouter;
