"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderRouter = void 0;
const providerController_1 = require("../controllers/providerController");
const baseRouter_1 = require("./baseRouter");
class ProviderRouter extends baseRouter_1.BaseRouter {
    constructor() {
        super(providerController_1.ProviderController);
    }
    routes() {
        this.router.get('/providers', (req, res) => this.controller.getAllProviders(req, res));
        this.router.post('/newProvider', (req, res) => this.controller.addProvider(req, res));
        this.router.patch('/editProvider', (req, res) => this.controller.editProvider(req, res));
        this.router.delete('/deleteProvider/:providerId', (req, res) => this.controller.deleteProvider(req, res));
    }
}
exports.ProviderRouter = ProviderRouter;
