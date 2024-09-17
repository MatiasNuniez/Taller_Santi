import { Router } from "express";
import { RegisterController } from "../controllers/registerController";
import { BaseRouter } from "./baseRouter";

// Creamos la clase para registar un usuario
export class RegisterRouter extends BaseRouter<RegisterController>{

    constructor() {
        super(RegisterController)
    }
    // Rutas para las peticiones de register
    routes(): void {
        this.router.post('/register', (req, res) => this.controller.regUser(req, res))
    }
}