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
exports.VentasController = void 0;
const ventaModel_1 = require("../models/ventaModel");
const usersModel_1 = require("../models/usersModel");
class VentasController {
    addSale(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const user = yield usersModel_1.userModel.findOne({ DNI: data.userDNI });
            if (!user) {
                throw new Error('eres usuario');
            }
            if (user.state && user.rol === 'admin') {
                try {
                    const venta = yield ventaModel_1.ventaModel.create(data.venta);
                    res.status(200).json(venta);
                }
                catch (error) {
                    throw new Error('Error al cargar la nueva venta');
                }
            }
            else {
                throw new Error('No posee los permisos necesarios');
            }
        });
    }
    getSales(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield ventaModel_1.ventaModel.find({});
            res.status(200).json(data);
        });
    }
}
exports.VentasController = VentasController;
