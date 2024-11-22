import { Request, Response } from "express";
import { ventaModel } from "../models/ventaModel";
import { userModel } from "../models/usersModel";
import { SECRETKEY } from "../config/config";

export class VentasController {

    public async getSales(req: Request, res: Response) {
        const data = await ventaModel.find({})
        res.status(200).json(data)
    }
}