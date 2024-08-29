import mongoose from "mongoose";
import { userModel } from "../models/usersModel";
import { Request, Response } from "express";

export class RegisterController {

    // Registrar un usuario
    public async regUser(req: Request, res: Response) {
        try {            
            // Obtenemos los datos del front
            const data = req.body;

            // Buscamos el usuario por DNI para no registrar uno que ya esta registrado
            const existingUser = await userModel.findOne({ DNI: data.DNI });
            if (existingUser) {
                // Si el usuario ya existe, devolvemos un error 400
                return res.status(400).json({ error: "El usuario ya existe" });
            }

            // Si no existe, creamos el nuevo usuario
            const newUser = await userModel.create(data);

            // Respondemos con el usuario creado y un código 201
            return res.status(201).json(newUser);
        } catch (error) {
            // Si no puede hacer la consulta a la base de datos devolvemos un error con ese mismo msj
            console.error("Error en la consulta de la base de datos:", error);
            return res.status(500).json({ error: "Error en la consulta de la base de datos" });
        }
    }
}
