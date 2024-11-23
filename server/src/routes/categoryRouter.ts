import { CategoryController } from "../controllers/categoryController";
import { BaseRouter } from "./baseRouter";

export class CategoryRouter extends BaseRouter<CategoryController>{

    constructor() {
        super(CategoryController)
    }

    routes(): void {
        this.router.patch('/category', (req, res) => this.controller.editCategory(req, res))
        this.router.post('/category', (req, res) => this.controller.addCategory(req, res))
        this.router.get('/category', (req, res) => this.controller.getAllCategories(req, res))
        this.router.delete('/deleteCategory/:categoryId', (req, res) => this.controller.deleteCategory(req, res))
    }
}