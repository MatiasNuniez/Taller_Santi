import { BaseRouter } from "./baseRouter";
import { ProductController } from "../controllers/productController";


export class ProductRouter extends BaseRouter<ProductController>{

    constructor() {
        super(ProductController)
    }

    routes(): void {
        this.router.get('/products', (req,res) => this.controller.getAllProducts(req,res))
        this.router.post('/newProduct', (req, res) => this.controller.addProduct(req, res))
        this.router.patch('/editProduct', (req, res) => this.controller.editProduct(req, res))
        this.router.delete('/deleteProduct/:productId', (req, res) => this.controller.deleteProduct(req, res))
    }
}