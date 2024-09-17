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
exports.ProductController = void 0;
const usersModel_1 = require("../models/usersModel");
const productsModel_1 = require("../models/productsModel");
class ProductController {
    // Agregamos un nuevo producto
    addProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, userDNI } = req.body;
            const user = yield usersModel_1.userModel.findOne({ DNI: userDNI });
            if (user && user.rol === 'admin' && user.state === true) {
                try {
                    const newProduct = {
                        nombre: data.nombre,
                        costo: data.costo,
                        descripcion: data.descripcion,
                        precio_u: data.precio_u,
                        idProvider: data.idProvider
                    };
                    const addNewProduct = yield productsModel_1.productModel.create(newProduct);
                    return res.status(200).json(addNewProduct);
                }
                catch (error) {
                    return res.status(500).json({ error: 'Error al consultar la base de datos' });
                }
            }
            return res.status(401).json({ error: 'No posee los permisos necesarios' });
        });
    }
    // Editar productos
    editProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idProduct, data, userDNI } = req.body;
            if (!idProduct || !data) {
                return res.status(400).json({ message: 'Faltan datos' });
            }
            const user = yield usersModel_1.userModel.findOne({ DNI: userDNI });
            if (user && user.rol === 'admin' && user.state === true) {
                try {
                    const updatedProduct = yield productsModel_1.productModel.findByIdAndUpdate(idProduct, data, { new: true });
                    if (!updatedProduct) {
                        return res.status(404).json({ message: 'Producto no encontrado' });
                    }
                    return res.status(200).json(updatedProduct);
                }
                catch (error) {
                    return res.status(500).json({ message: 'Error interno del servidor', error });
                }
            }
            else {
                return res.status(401).json({ message: 'No posee los permisos necesarios' });
            }
        });
    }
    // Eliminar producto
    deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userDNI } = req.body;
            const { productId } = req.params;
            if (!productId) {
                return res.status(400).json({ message: 'Falta el id del elemento que se quiere eliminar' });
            }
            const user = yield usersModel_1.userModel.findOne({ DNI: userDNI });
            if (user && user.rol === 'admin' && user.state === true) {
                try {
                    const deleteProduct = yield productsModel_1.productModel.findByIdAndDelete(productId);
                    if (!deleteProduct) {
                        return res.status(404).json({ message: 'Producto no encontrado' });
                    }
                    return res.status(200).json({ message: 'Producto eliminado correctamente' });
                }
                catch (error) {
                    return res.status(500).json({ message: 'Error interno del servidor', error });
                }
            }
            else {
                return res.status(401).json({ message: 'No posee los permisos necesarios' });
            }
        });
    }
}
exports.ProductController = ProductController;
