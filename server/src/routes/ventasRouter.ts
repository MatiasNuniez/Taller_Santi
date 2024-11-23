import { Router } from "express";
import { VentasController } from "../controllers/ventasController";
import { BaseRouter } from "./baseRouter";

export class VentasRouter extends BaseRouter<VentasController>{

    constructor() {
        super(VentasController)
    }

    routes(): void {
        this.router.get('/ventas', (req, res) => this.controller.getSales(req, res))
    }
}