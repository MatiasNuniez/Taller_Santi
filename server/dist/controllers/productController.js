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
exports.ProductController = void 0;
const usersModel_1 = require("../models/usersModel");
const productsModel_1 = require("../models/productsModel");
const config_1 = require("../config/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class ProductController {
    getAllProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Token no proporcionado' });
            }
            try {
                const decoded = jsonwebtoken_1.default.verify(token, config_1.SECRETKEY || '');
                const user = yield usersModel_1.userModel.findById(decoded.id);
                if (!user) {
                    throw new Error('Usuario no encontrado');
                }
                if (user.state) {
                    try {
                        const data = yield productsModel_1.productModel.find({});
                        res.status(200).json(data);
                    }
                    catch (error) {
                        throw new Error('Error al obtener los productos');
                    }
                }
            }
            catch (error) {
                return res.status(403).json({ message: 'Token inválido o expirado', error });
            }
        });
    }
    addProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { product } = req.body;
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Token no proporcionado' });
            }
            try {
                const decoded = jsonwebtoken_1.default.verify(token, config_1.SECRETKEY || '');
                const user = yield usersModel_1.userModel.findById(decoded.id);
                if (!user) {
                    return res.status(404).json({ error: 'Usuario no encontrado' });
                }
                if (user.state) {
                    if (!product.nombre || !product.costo || !product.descripcion || !product.precio_u || !product.idProvider || !product.cantidad) {
                        return res.status(400).json({ error: 'Datos del producto incompletos o inválidos' });
                    }
                    const newProduct = {
                        nombre: product.nombre,
                        costo: product.costo,
                        cantidad: product.cantidad,
                        descripcion: product.descripcion,
                        precio_u: product.precio_u,
                        idProvider: product.idProvider,
                        categoria: product.categoria,
                        img: product.urlImg,
                        marca: product.marca
                    };
                    const addNewProduct = yield productsModel_1.productModel.create(newProduct);
                    return res.status(200).json(addNewProduct);
                }
                return res.status(401).json({ error: 'No posee los permisos necesarios' });
            }
            catch (error) {
                return res.status(403).json({ message: 'Token inválido o expirado', error });
            }
        });
    }
    editProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idProduct, data } = req.body;
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Token no proporcionado' });
            }
            if (!idProduct || !data) {
                return res.status(400).json({ message: 'Faltan datos' });
            }
            try {
                const decoded = jsonwebtoken_1.default.verify(token, config_1.SECRETKEY || '');
                const user = yield usersModel_1.userModel.findById(decoded.id);
                if (user && user.state === true) {
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
            }
            catch (error) {
                return res.status(403).json({ message: 'Token inválido o expirado', error });
            }
        });
    }
    deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { productId } = req.params;
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Token no proporcionado' });
            }
            try {
                const decoded = jsonwebtoken_1.default.verify(token, config_1.SECRETKEY || '');
                const user = yield usersModel_1.userModel.findById(decoded.id);
                if (!productId) {
                    return res.status(400).json({ message: 'Falta el id del elemento que se quiere eliminar' });
                }
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
            }
            catch (error) {
                return res.status(403).json({ message: 'Token inválido o expirado', error });
            }
        });
    }
}
exports.ProductController = ProductController;
