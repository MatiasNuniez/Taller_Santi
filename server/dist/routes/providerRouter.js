"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderRouter = void 0;
const providerController_1 = require("../controllers/providerController");
const baseRouter_1 = require("./baseRouter");
// Creamos la clase para agregar un nuevo producto
class ProviderRouter extends baseRouter_1.BaseRouter {
    constructor() {
        super(providerController_1.ProviderController);
    }
    // Rutas para las peticiones de proveedores
    routes() {
        this.router.post('/newProvider', (req, res) => this.controller.addProvider(req, res));
        this.router.patch('/editProvider', (req, res) => this.controller.editProvider(req, res));
        this.router.delete('/deleteProvider/:providerId', (req, res) => this.controller.deleteProvider(req, res));
    }
}
exports.ProviderRouter = ProviderRouter;
