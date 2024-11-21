"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRouter = void 0;
const cartController_1 = require("../controllers/cartController");
const baseRouter_1 = require("./baseRouter");
// Creamos la clase para loggear un usuario
class CartRouter extends baseRouter_1.BaseRouter {
    constructor() {
        super(cartController_1.CartController);
    }
    // Rutas para las peticiones de login
    routes() {
        this.router.post('/cartPayment', (req, res) => this.controller.getDataPayment(req, res));
    }
}
exports.CartRouter = CartRouter;
