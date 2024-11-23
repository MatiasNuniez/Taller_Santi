import { ProviderController } from "../controllers/providerController";
import { BaseRouter } from "./baseRouter";

export class ProviderRouter extends BaseRouter<ProviderController>{

    constructor() {
        super(ProviderController)
    }
    routes(): void {
        this.router.get('/providers', (req, res) => this.controller.getAllProviders(req, res))
        this.router.post('/newProvider', (req, res) => this.controller.addProvider(req, res))
        this.router.patch('/editProvider', (req, res) => this.controller.editProvider(req, res))
        this.router.delete('/deleteProvider/:providerId', (req, res) => this.controller.deleteProvider(req, res))
    }
}