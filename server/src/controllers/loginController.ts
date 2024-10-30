import { Request, Response } from "express";
import { userModel } from "../models/usersModel";
import jsonwebtoken from "jsonwebtoken";
import { SECRETKEY } from "../config/config";

export class LoginController {

    private key: string;

    constructor() {
        this.key = SECRETKEY || '';
    }


    // Funcion para realizar el login
    public async login(req: Request, res: Response) {
        try {
            // Obtenemos los datos del front y ademas buscamos el usuario que quiere iniciar sesion
            const data = req.body
            const user = await userModel.findOne({ DNI: data.DNI })
            // Verificamos que exista el usuario, coincida la password y que la secret key exista
            if ((user) && (user.password === data.password) && (this.key !== '')) {
                const payload = { id: user._id, check: true }
                const token = jsonwebtoken.sign(payload, this.key)
                res.status(201).send({ token: token, DNI: user.DNI })
            } else {
                res.status(400).json({ Error: 'No se encontro el usuario registrado, registrelo primero' })
            }
        } catch (error) {
            res.status(500).json({ Error: 'Error al intentar iniciar sesion' })
        }

    }

}