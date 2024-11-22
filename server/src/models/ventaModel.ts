import mongoose, { Schema, Model } from "mongoose";
import { VentaInterface } from "../interfaces/ventaInterface";


class VentaModel {

    public _model: Model<VentaInterface>

    constructor() {
        const VentaModel = new Schema<VentaInterface>({
            fecha: {
                type: Number,
                default: Date.now()
            },
            idVenta: {
                type: String,
                required: true
            },
            total: {
                type: Number,
                required: true
            }
        })

        this._model = mongoose.model('ventaModel', VentaModel)
    }
}

export const ventaModel = new VentaModel()._model;