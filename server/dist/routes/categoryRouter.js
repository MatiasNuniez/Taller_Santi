"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRouter = void 0;
const categoryController_1 = require("../controllers/categoryController");
const baseRouter_1 = require("./baseRouter");
// Creamos la clase para loggear un usuario
class CategoryRouter extends baseRouter_1.BaseRouter {
    constructor() {
        super(categoryController_1.CategoryController);
    }
    // Rutas para las peticiones de login
    routes() {
        this.router.patch('/category', (req, res) => this.controller.editCategory(req, res));
        this.router.post('/category', (req, res) => this.controller.addCategory(req, res));
        this.router.get('/category/:userDNI', (req, res) => this.controller.getAllCategories(req, res));
        this.router.delete('/deleteCategory/:categoryId/:userDNI', (req, res) => this.controller.deleteCategory(req, res));
    }
}
exports.CategoryRouter = CategoryRouter;
