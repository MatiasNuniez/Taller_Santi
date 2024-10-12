import { ProviderController } from "../controllers/providerController";
import { BaseRouter } from "./baseRouter";

// Creamos la clase para agregar un nuevo producto
export class ProviderRouter extends BaseRouter<ProviderController>{

    constructor() {
        super(ProviderController)
    }
    // Rutas para las peticiones de proveedores
    routes(): void {
        this.router.get('/providers/:userDNI', (req, res) => this.controller.getAllProviders(req, res))
        this.router.post('/newProvider', (req, res) => this.controller.addProvider(req, res))
        this.router.patch('/editProvider', (req, res) => this.controller.editProvider(req, res))
        this.router.delete('/deleteProvider/:providerId/:userDNI', (req, res) => this.controller.deleteProvider(req, res))
    }
}