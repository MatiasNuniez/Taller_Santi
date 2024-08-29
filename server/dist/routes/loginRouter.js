"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginRouter = void 0;
const loginController_1 = require("../controllers/loginController");
const baseRouter_1 = require("./baseRouter");
class LoginRouter extends baseRouter_1.BaseRouter {
    constructor() {
        super(loginController_1.LoginController);
    }
    routes() {
        this.router.post('/login', (req, res) => this.controller.login(req, res));
    }
}
exports.LoginRouter = LoginRouter;
