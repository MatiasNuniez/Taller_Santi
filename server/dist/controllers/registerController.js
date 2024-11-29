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
    regUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const existingUser = yield usersModel_1.userModel.findOne({ DNI: data.DNI });
                if (existingUser) {
                    return res.status(400).json({ error: "El usuario ya existe" });
                }
                const newUser = yield usersModel_1.userModel.create(data);
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
