import mongoose, { Schema, Model } from "mongoose";
import { facturaInterface } from "../interfaces/facturaInterface";

class FacturaModel {

    public _model: Model<facturaInterface>

    constructor() {
        const FacturaModel = new Schema<facturaInterface>({
            detalle:{
                type:String,
                required:true
            },
            f_pago:{
                type:Date,
                required:true
            },
            fecha:{
                type:Date,
                default:Date.now()
            },
            m_entrega:{
                type:String,
                required:true
            },
            subTotal:{
                type:Number,
                required:true
            },
            total:{
                type:Number,
                required:true
            }
        })

        this._model = mongoose.model('facturaModel', FacturaModel)
    }
}

export const facturaModel = new FacturaModel()._model;