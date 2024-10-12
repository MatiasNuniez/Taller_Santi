import { CategoryController } from "../controllers/categoryController";
import { BaseRouter } from "./baseRouter";

// Creamos la clase para loggear un usuario
export class CategoryRouter extends BaseRouter<CategoryController>{

    constructor() {
        super(CategoryController)
    }

    // Rutas para las peticiones de login
    routes(): void {
        this.router.patch('/category', (req, res) => this.controller.editCategory(req, res))
        this.router.post('/category', (req, res) => this.controller.addCategory(req, res))
        this.router.get('/category/:userDNI', (req, res) => this.controller.getAllCategories(req, res))
        this.router.delete('/deleteCategory/:categoryId/:userDNI', (req, res) => this.controller.deleteCategory(req, res))
    }
}