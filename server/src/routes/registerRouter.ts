import { Router } from "express";
import { RegisterController } from "../controllers/registerController";
import { BaseRouter } from "./baseRouter";

export class RegisterRouter extends BaseRouter<RegisterController>{

    constructor() {
        super(RegisterController)
    }
    routes(): void {
        this.router.post('/register', (req, res) => this.controller.regUser(req, res))
    }
}