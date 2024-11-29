"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRouter = void 0;
const baseRouter_1 = require("./baseRouter");
const productController_1 = require("../controllers/productController");
class ProductRouter extends baseRouter_1.BaseRouter {
    constructor() {
        super(productController_1.ProductController);
    }
    routes() {
        this.router.get('/products', (req, res) => this.controller.getAllProducts(req, res));
        this.router.post('/newProduct', (req, res) => this.controller.addProduct(req, res));
        this.router.patch('/editProduct', (req, res) => this.controller.editProduct(req, res));
        this.router.delete('/deleteProduct/:productId', (req, res) => this.controller.deleteProduct(req, res));
    }
}
exports.ProductRouter = ProductRouter;
