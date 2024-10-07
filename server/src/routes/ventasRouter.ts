import { Router } from "express";
import { VentasController } from "../controllers/ventasController";
import { BaseRouter } from "./baseRouter";

// Creamos la clase para registar un usuario
export class VentasRouter extends BaseRouter<VentasController>{

    constructor() {
        super(VentasController)
    }
    // Rutas para las peticiones de register
    routes(): void {
        this.router.post('/ventas', (req, res) => this.controller.addSale(req, res))
        this.router.get('/ventas', (req, res) => this.controller.getSales(req, res))
    }
}