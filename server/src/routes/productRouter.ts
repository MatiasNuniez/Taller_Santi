import { BaseRouter } from "./baseRouter";
import { ProductController } from "../controllers/productController";

// Creamos la clase para agregar un producto
export class ProductRouter extends BaseRouter<ProductController>{

    constructor() {
        super(ProductController)
    }
    // Rutas para las peticiones de productos
    routes(): void {
        this.router.get('/products/:userDNI', (req,res) => this.controller.getAllProducts(req,res))
        this.router.post('/newProduct', (req, res) => this.controller.addProduct(req, res))
        this.router.patch('/editProduct', (req, res) => this.controller.editProduct(req, res))
        this.router.delete('/deleteProduct/:productId/:userDNI', (req, res) => this.controller.deleteProduct(req, res))
    }
}