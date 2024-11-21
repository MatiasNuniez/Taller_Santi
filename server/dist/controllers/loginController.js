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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
const usersModel_1 = require("../models/usersModel");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
class LoginController {
    constructor() {
        this.key = config_1.SECRETKEY || '';
    }
    // Funcion para realizar el login
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Obtenemos los datos del front y ademas buscamos el usuario que quiere iniciar sesion
                const data = req.body;
                const user = yield usersModel_1.userModel.findOne({ DNI: data.DNI });
                // Verificamos que exista el usuario, coincida la password y que la secret key exista
                if ((user) && (user.password === data.password) && (this.key !== '')) {
                    const payload = { id: user._id, rol: user.rol, check: true };
                    const token = jsonwebtoken_1.default.sign(payload, this.key);
                    res.status(201).send({ token: token });
                }
                else {
                    res.status(400).json({ Error: 'No se encontro el usuario registrado, registrelo primero' });
                }
            }
            catch (error) {
                res.status(500).json({ Error: 'Error al intentar iniciar sesion' });
            }
        });
    }
}
exports.LoginController = LoginController;
