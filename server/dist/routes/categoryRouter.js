"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRouter = void 0;
const categoryController_1 = require("../controllers/categoryController");
const baseRouter_1 = require("./baseRouter");
class CategoryRouter extends baseRouter_1.BaseRouter {
    constructor() {
        super(categoryController_1.CategoryController);
    }
    routes() {
        this.router.patch('/category', (req, res) => this.controller.editCategory(req, res));
        this.router.post('/category', (req, res) => this.controller.addCategory(req, res));
        this.router.get('/category', (req, res) => this.controller.getAllCategories(req, res));
        this.router.delete('/deleteCategory/:categoryId', (req, res) => this.controller.deleteCategory(req, res));
    }
}
exports.CategoryRouter = CategoryRouter;
