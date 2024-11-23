import { Request, Response } from "express";
import { userModel } from "../models/usersModel";
import jsonwebtoken from "jsonwebtoken";
import { SECRETKEY } from "../config/config";

export class LoginController {

    private key: string;

    constructor() {
        this.key = SECRETKEY || '';
    }


    public async login(req: Request, res: Response) {
        try {
            const data = req.body
            const user = await userModel.findOne({ DNI: data.DNI })
            if ((user) && (user.password === data.password) && (this.key !== '')) {
                const payload = { id: user._id, rol: user.rol, check: true }
                const token = jsonwebtoken.sign(payload, this.key)
                res.status(201).send({ token: token })
            } else {
                res.status(400).json({ Error: 'No se encontro el usuario registrado, registrelo primero' })
            }
        } catch (error) {
            res.status(500).json({ Error: 'Error al intentar iniciar sesion' })
        }

    }

}