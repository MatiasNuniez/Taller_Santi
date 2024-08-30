import mongoose from "mongoose";
import { ProvidersInterface } from "../interfaces/providersInterface";

class providersModel {

    public _model: mongoose.Model<ProvidersInterface>

    constructor() {
        const providerModel = new mongoose.Schema<ProvidersInterface>({
            nombre: {
                type: String,
                required: true
            },
            apellido: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            direccion: {
                type: String,
                required: true
            },
            telefono: {
                type: String,
                required: true
            },
            cuit: {
                type: String,
                required: true
            }
        })
        this._model = mongoose.model("ProviderModel", providerModel)
    }

}

export const providerModel = new providersModel()._model