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
exports.CategoryController = void 0;
const usersModel_1 = require("../models/usersModel");
const categoryModels_1 = require("../models/categoryModels");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
class CategoryController {
    getAllCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Hola");
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Token no proporcionado' });
            }
            try {
                const decoded = jsonwebtoken_1.default.verify(token, config_1.SECRETKEY || '');
                const user = yield usersModel_1.userModel.findById(decoded.id);
                if (!user) {
                    return res.status(400).json({ message: 'El usuario no existe' });
                }
                if (user.rol === 'admin' && user.state) {
                    try {
                        const allCategories = yield categoryModels_1.categoryModel.find({});
                        return res.status(200).send(allCategories);
                    }
                    catch (error) {
                        return res.status(500).json({ message: 'Error al consultar a la base de datos' });
                    }
                }
                else {
                    return res.status(401).json({ message: 'No posee los permisos necesarios o no está activo' });
                }
            }
            catch (error) {
                return res.status(403).json({ message: 'Token inválido o expirado', error });
            }
        });
    }
    addCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, marca, urlImg } = req.body;
            const existCategory = yield categoryModels_1.categoryModel.findOne({ nombre: nombre });
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Token no proporcionado' });
            }
            try {
                const decoded = jsonwebtoken_1.default.verify(token, config_1.SECRETKEY || '');
                const user = yield usersModel_1.userModel.findById(decoded.id);
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
            }
            catch (error) {
                return res.status(403).json({ message: 'Token inválido o expirado', error });
            }
        });
    }
    editCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, idCategory } = req.body;
            const category = yield categoryModels_1.categoryModel.findOne({ _id: idCategory });
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Token no proporcionado' });
            }
            try {
                const decoded = jsonwebtoken_1.default.verify(token, config_1.SECRETKEY || '');
                const user = yield usersModel_1.userModel.findById(decoded.id);
                if (!user) {
                    return res.status(400).json({ msj: 'No existe el usuario' });
                }
                if (!category) {
                    return res.status(400).json({ msj: 'La categoria no existe' });
                }
                if ((user.rol === 'admin') && (user.state)) {
                    try {
                        const updateCategory = yield categoryModels_1.categoryModel.findByIdAndUpdate(idCategory, data, { new: true });
                        if (!updateCategory) {
                            return res.status(404).json({ msj: 'Error al actualizar la categoria' });
                        }
                        return res.status(201).json(updateCategory);
                    }
                    catch (error) {
                        return res.status(404).json({ msj: 'Error al actualizar categoria en la base de datos' });
                    }
                }
                else {
                    res.status(401).json({ msj: 'No posee los permisos necesarios' });
                }
            }
            catch (error) {
                return res.status(403).json({ message: 'Token inválido o expirado', error });
            }
        });
    }
    deleteCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { categoryId } = req.params;
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Token no proporcionado' });
            }
            try {
                const decoded = jsonwebtoken_1.default.verify(token, config_1.SECRETKEY || '');
                const user = yield usersModel_1.userModel.findById(decoded.id);
                if (!categoryId) {
                    return res.status(400).json({ message: 'Falta el id del elemento que se quiere eliminar' });
                }
                if (user && user.rol === 'admin' && user.state === true) {
                    try {
                        const deleteProduct = yield categoryModels_1.categoryModel.findByIdAndDelete(categoryId);
                        if (!deleteProduct) {
                            return res.status(404).json({ message: 'Categoria no encontrado' });
                        }
                        return res.status(200).json({ message: 'Categoria eliminada correctamente' });
                    }
                    catch (error) {
                        return res.status(500).json({ message: 'Error interno del servidor', error });
                    }
                }
                else {
                    return res.status(401).json({ message: 'No posee los permisos necesarios' });
                }
            }
            catch (error) {
                return res.status(403).json({ message: 'Token inválido o expirado', error });
            }
        });
    }
}
exports.CategoryController = CategoryController;
