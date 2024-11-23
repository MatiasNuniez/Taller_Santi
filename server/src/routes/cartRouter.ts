import { CartController } from "../controllers/cartController";
import { BaseRouter } from "./baseRouter";

export class CartRouter extends BaseRouter<CartController>{

    constructor() {
        super(CartController)
    }

    routes(): void {
        this.router.post('/cartPayment', (req, res) => this.controller.getDataPayment(req, res));
        this.router.post('/paymentInfo', (req, res) => this.controller.paymentNotification(req, res));
    }
}