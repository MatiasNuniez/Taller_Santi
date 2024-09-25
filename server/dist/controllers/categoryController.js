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
exports.CategoryController = void 0;
const usersModel_1 = require("../models/usersModel");
const categoryModels_1 = require("../models/categoryModels");
class CategoryController {
    getAllCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userDNI } = req.params;
            const user = yield usersModel_1.userModel.findOne({ DNI: userDNI });
            if (!user) {
                return res.status(400).json({ msj: 'El usuario no existe' });
            }
            if (user.rol === 'admin' && user.state) {
                try {
                    const allCategories = yield categoryModels_1.categoryModel.find({});
                    return res.status(200).send(allCategories);
                }
                catch (error) {
                    res.status(500).json({ msj: 'error al consultar a la base de datos' });
                }
            }
            else {
                res.status(401).json({ msj: 'No posee los permisos necesarios o no esta activo' });
            }
        });
    }
    addCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userDNI, nombre, marca, urlImg } = req.body;
            const user = yield usersModel_1.userModel.findOne({ DNI: userDNI });
            const existCategory = yield categoryModels_1.categoryModel.findOne({ nombre: nombre });
            if (!user) {
                return res.status(400).json({ msj: 'El usuario no existe' });
            }
            if (existCategory) {
                return res.status(400).json({ msj: 'La categoria ya existe' });
            }
            if (user.rol === 'admin' && user.state) {
                try {
                    const newCategory = {
                        nombre: nombre,
                        marca: marca,
                        urlImg: urlImg
                    };
                    console.log(newCategory);
                    const addNewCategory = yield categoryModels_1.categoryModel.create(newCategory);
                    res.status(200).json({ Nueva_categoria: addNewCategory });
                }
                catch (error) {
                    res.status(404).json({ msj: 'Error al crear nueva categoria' });
                }
            }
            else {
                res.status(401).json({ msj: 'No posee los permisos necesarios' });
            }
        });
    }
}
exports.CategoryController = CategoryController;
