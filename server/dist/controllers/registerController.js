"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterController = void 0;
const usersModel_1 = require("../models/usersModel");
class RegisterController {
    // Registrar un usuario
    regUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('hola');
                // Obtenemos los datos del front
                const data = req.body;
                // Buscamos el usuario por DNI para no registrar uno que ya esta registrado
                const existingUser = yield usersModel_1.userModel.findOne({ DNI: data.DNI });
                if (existingUser) {
                    // Si el usuario ya existe, devolvemos un error 400
                    return res.status(400).json({ error: "El usuario ya existe" });
                }
                // Si no existe, creamos el nuevo usuario
                const newUser = yield usersModel_1.userModel.create(data);
                // Respondemos con el usuario creado y un código 201
                return res.status(201).json(newUser);
            }
            catch (error) {
                console.error("Error en la consulta de la base de datos:", error);
                return res.status(500).json({ error: "Error en la consulta de la base de datos" });
            }
        });
    }
}
exports.RegisterController = RegisterController;
