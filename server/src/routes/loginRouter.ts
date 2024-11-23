import { LoginController } from "../controllers/loginController";
import { BaseRouter } from "./baseRouter";

export class LoginRouter extends BaseRouter<LoginController>{

    constructor() {
        super(LoginController)
    }

    routes(): void {
        this.router.post('/login', (req, res) => this.controller.login(req, res))
    }
}