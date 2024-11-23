import mongoose from "mongoose";
import { userModel } from "../models/usersModel";
import { Request, Response } from "express";

export class RegisterController {


    public async regUser(req: Request, res: Response) {  
        try {            

            const data = req.body;


            const existingUser = await userModel.findOne({ DNI: data.DNI });
            if (existingUser) {

                return res.status(400).json({ error: "El usuario ya existe" });
            }


            const newUser = await userModel.create(data);


            return res.status(201).json(newUser);
        } catch (error) {

            console.error("Error en la consulta de la base de datos:", error);
            return res.status(500).json({ error: "Error en la consulta de la base de datos" });
        }
    }
}
