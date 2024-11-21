import { Request, Response } from "express";
import { ventaModel } from "../models/ventaModel";
import { userModel } from "../models/usersModel";
import { SECRETKEY } from "../config/config";

export class VentasController {

    public async addSale(req: Request, res: Response) {
        const data = req.body;

        const user = await userModel.findOne({ DNI: data.userDNI })

        if (!user) {
            throw new Error('eres usuario')
        }

        if (user.state && user.rol === 'admin') {
            try {
                const venta = await ventaModel.create(data.venta)
                res.status(200).json(venta)
            } catch (error) {
                throw new Error('Error al cargar la nueva venta')
            }
        } else {
            throw new Error('No posee los permisos necesarios')
        }
    }

    public async getSales(req: Request, res: Response) {
        const data = await ventaModel.find({})
        res.status(200).json(data)
    }
}