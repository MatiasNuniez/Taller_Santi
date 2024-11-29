"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRouter = void 0;
const cartController_1 = require("../controllers/cartController");
const baseRouter_1 = require("./baseRouter");
class CartRouter extends baseRouter_1.BaseRouter {
    constructor() {
        super(cartController_1.CartController);
    }
    routes() {
        this.router.post('/cartPayment', (req, res) => this.controller.getDataPayment(req, res));
        this.router.post('/paymentInfo', (req, res) => this.controller.paymentNotification(req, res));
    }
}
exports.CartRouter = CartRouter;
