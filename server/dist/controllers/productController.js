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
    getAllProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userDNI } = req.params;
            const user = yield usersModel_1.userModel.findOne({ DNI: userDNI });
            if (!user) {
                throw new Error('Usuario no encontrado');
            }
            if (user.rol === 'admin' && user.state) {
                try {
                    const data = yield productsModel_1.productModel.find({});
                    res.status(200).json(data);
                }
                catch (error) {
                    throw new Error('Error al obtener los productos');
                }
            }
        });
    }
    // Agregamos un nuevo producto
    addProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { product, userDNI } = req.body;
                console.log(product);
                console.log(userDNI);
                // Buscar el usuario en la base de datos
                const user = yield usersModel_1.userModel.findOne({ DNI: userDNI });
                // Verificar si el usuario existe
                if (!user) {
                    return res.status(404).json({ error: 'Usuario no encontrado' });
                }
                // Verificar si el usuario tiene rol de admin y su estado es activo
                if (user.rol === 'admin' && user.state) {
                    // Validar que los datos del producto sean correctos
                    if (!product.nombre || !product.costo || !product.descripcion || !product.precio_u || !product.idProvider || !product.cantidad) {
                        return res.status(400).json({ error: 'Datos del producto incompletos o inválidos' });
                    }
                    // Crear el nuevo producto
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
                    // Guardar el nuevo producto en la base de datos
                    const addNewProduct = yield productsModel_1.productModel.create(newProduct);
                    // Retornar el producto agregado como respuesta
                    return res.status(200).json(addNewProduct);
                }
                // Si el usuario no tiene permisos
                return res.status(401).json({ error: 'No posee los permisos necesarios' });
            }
            catch (error) {
                // Manejar errores inesperados
                console.error('Error al agregar el producto:', error);
                return res.status(500).json({ error: 'Error al consultar la base de datos' });
            }
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
