import { CartController } from "../controllers/cartController";
import { BaseRouter } from "./baseRouter";

// Creamos la clase para loggear un usuario
export class CartRouter extends BaseRouter<CartController>{

    constructor() {
        super(CartController)
    }

    // Rutas para las peticiones de login
    routes(): void {
        this.router.post('/cartPayment', (req, res) => this.controller.getDataPayment(req, res))
    }
}