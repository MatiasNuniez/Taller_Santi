import { LoginController } from "../controllers/loginController";
import { BaseRouter } from "./baseRouter";

// Creamos la clase para loggear un usuario
export class LoginRouter extends BaseRouter<LoginController>{

    constructor() {
        super(LoginController)
    }

    // Rutas para las peticiones de login
    routes(): void {
        this.router.post('/login', (req, res) => this.controller.login(req, res))
    }
}