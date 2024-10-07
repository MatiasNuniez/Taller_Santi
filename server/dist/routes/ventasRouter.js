"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VentasRouter = void 0;
const ventasController_1 = require("../controllers/ventasController");
const baseRouter_1 = require("./baseRouter");
// Creamos la clase para registar un usuario
class VentasRouter extends baseRouter_1.BaseRouter {
    constructor() {
        super(ventasController_1.VentasController);
    }
    // Rutas para las peticiones de register
    routes() {
        this.router.post('/ventas', (req, res) => this.controller.addSale(req, res));
        this.router.get('/ventas', (req, res) => this.controller.getSales(req, res));
    }
}
exports.VentasRouter = VentasRouter;
